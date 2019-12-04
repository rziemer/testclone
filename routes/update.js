var express = require('express');
var mysql = require('mysql2');
var envResult = require('dotenv').config();
var router = express.Router();

var config =
{
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_DB,
    port: process.env.DB_PORT,
    ssl: JSON.parse(process.env.DB_SSL.toLowerCase())
};

function UpdateSQLData(updateData, updateRow)
{
    function SQLErrorHandler(err)
    {
        if (err)
        {
            console.log("Error: " + err);
            console.log('this.sql', this.sql); //command/query
            throw err;
        }
    }

    // update statment
    var conn = new mysql.createConnection(config);
    conn.connect(SQLErrorHandler);
    // The below line is wrong
    conn.query('UPDATE `demo_table` SET `demo_logitem`=(?) WHEN `demo_key`=(?)', [updateData], [updateRow], SQLErrorHandler);
    // Problem 1: will cause an application crash.  The '[updateData], [updateRow],' should have brackets around it to present
    // the data as a single array argument passed into the query -- '[[updateData], [updateRow]],'
    // Problem 2: will cause a SQL error as the SQL syntax uses a WHERE clause not the verb WHEN and as such should read
    // '`demo_logitem`=(?) WHERE `demo_key`=(?)'
    //
    console.log(updateData);
    console.log(updateRow);
    conn.end(SQLErrorHandler);
}

router.post('/', function(req, res, next) {
    UpdateSQLData(req.body.updatevalue, req.body.selection);
    res.redirect('/echo');
});

module.exports = router;