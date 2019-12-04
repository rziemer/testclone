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

function PutSQLData(insertData)
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
    conn.query('INSERT INTO demo_table (`demo_logitem`) VALUE (?)', [insertData], SQLErrorHandler);
    conn.end(SQLErrorHandler);
}

router.post('/', function(req, res, next) {
    PutSQLData(req.body.data);
    res.redirect('/echo');
});

module.exports = router;
