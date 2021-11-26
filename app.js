const express = require('express')
const expressWs = require('express-ws')

const app = express()
expressWs(app)

//设置跨域访问
app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

var test = require('./routes/test');
var getForce = require('./routes/getForce');
var sendForce = require('./routes/sendForce');

app.use('/test',test)
app.use('/getforce',getForce)
app.use('/sendforce',sendForce)

app.listen(12345,()=>{
    console.log('Server running at http://localhost:12345')
})