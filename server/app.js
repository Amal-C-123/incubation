var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const db = require('./config/connection')
const cors = require('cors')


var userRouter = require('./routes/user');
var adminRouter = require('./routes/admin');

var app = express();
db.connectDB()
app.use(logger('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', userRouter); 
app.use('/admin', adminRouter);

module.exports = app;
