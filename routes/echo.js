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

function GetSQLData(res)
{
    function SQLErrorHandler(err)
    {
        if (err)
        {
            console.log("Error: " + err);
            throw err;
        }
    }

    function SQLSelectHandler(err, result, fields)
    {
        if (err)
        {
            console.log("Error: " + err);
            throw err;
        }
        res.render('echoRequest', { myTitle: 'Echo Request', myData: result})
    }

    var conn = new mysql.createConnection(config);
    conn.connect(SQLErrorHandler);
    conn.query('SELECT * FROM `demo_table`', SQLSelectHandler);
    conn.end(SQLErrorHandler);
}

router.get('/', function(req, res, next) {
    GetSQLData(res);
});

module.exports = router;
