var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var redis = require('redis');
var mongo = require('mongo');
var knex = require('knex');
var bookshelf = require('bookshelf');
var redisStore = require('connect-redis')(session);

var index = require('./routes/index');
var users = require('./routes/users');

var cookie = require('./routes/cookie');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'recommend 128 bytes random string', // 建议使用 128 个字符的随机字符串
    //cookie: { maxAge: 60 * 1000 },
    store: new redisStore({host:'127.0.0.1',
        port:'6379',
        db:0}),
    resave: true,
    saveUninitialized: true

}));

app.use('/', index);
app.use('/users', users);
app.use('/cookie', cookie);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
