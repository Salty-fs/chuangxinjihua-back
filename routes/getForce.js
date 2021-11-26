var express = require('express');
var router = express.Router();
var URL = require('url');
const fs = require('fs')
const expressWs = require('express-ws')


// 加载mysql模块
var mysql = require('mysql');
var config = require('../config/dbconfig');
var connection = mysql.createConnection(config);

//SQL语句
//  var  sql = 'SELECT * FROM user';
var  addSql = 'INSERT INTO info(devicename,productid,timestamp,timemills,force_of_hx,measure) VALUES(?,?,?,?,?,?)';

var EventEmitter = require('events').EventEmitter
var myevent = new EventEmitter();

router.post('/', function(req, res, next) {
  let data = JSON.stringify(req.body) +"\r\n"
  //触发事件   
  try{
    myevent.emit('abc',data)
    console.log(data);
  }catch(err){
    console.log(err)
  }

  console.log("@req",req)
  console.log("@res",body)
  var addSqlParams = [req.body.devicename,req.body.productid,req.body.timestamp,req.body.timemills,req.body.payload.params.force_of_hx,req.body.payload.params.measure];

  connection.query(addSql,addSqlParams,function (err, result) {
      if(err){
       console.log('[INSERT ERROR] - ',err.message);
       return;
      }
      result.message='success'
      console.log(result.message)             
  });
  res.send(req.body)
});

module.exports = {
  router,
  myevent
};