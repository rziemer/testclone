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

function DeleteSQLData(deleteData)
{
    function SQLErrorHandler(err)
    {
        if (err)
        {
            console.log("Error: " + err);
            throw err;
        }
    }
      
    var conn = new mysql.createConnection(config);
    conn.connect(SQLErrorHandler);
    conn.query('DELETE FROM `demo_table` WHERE `demo_key`=(?)', [deleteData], SQLErrorHandler);
    conn.end(SQLErrorHandler);
}

router.post('/', function(req, res, next) {
    DeleteSQLData(req.body.selection);
    res.redirect('/echo');
});

module.exports = router;
