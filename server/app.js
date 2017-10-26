const Koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const fs = require('fs');

const app =new Koa();




app.listen(3000);
console.log('app started at port 3000...');