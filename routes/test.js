var express = require('express');
var router = express.Router();
// var URL = require('url');
//加载mysql模块
var mysql = require('mysql');

var config = require('../config/dbconfig');

var connection = mysql.createConnection(config);

//SQL语句
 var  sql = 'SELECT * FROM user';

router.get('/', function(req, res, next) {
    // res.send('fuck LiSir')
    
    // 查
    connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        //把搜索值输出
       res.send(result);
    });
});

module.exports = router;