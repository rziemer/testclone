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
    conn.query('UPDATE `demo_table` SET `demo_logitem`=(?) WHERE `demo_key`=(?)', [[updateData], [updateRow]], SQLErrorHandler);
    console.log(updateData);
    console.log(updateRow);
    conn.end(SQLErrorHandler);
}

router.post('/', function(req, res, next) {
    UpdateSQLData(req.body.updatevalue, req.body.selection);
    res.redirect('/echo');
});

module.exports = router;
