"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var morgan = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var config = require("config");
var index_1 = require("./routes/index");
var users_1 = require("./routes/users");
var http = require("http");
var app = express();
var appRouter = express.Router();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
var logger = morgan('dev');
app.use(logger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Setup routes
var indexRoutes = index_1.default(appRouter);
var userRoutes = users_1.default(appRouter);
// Use routes
app.use('/', appRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err['status'] = 404;
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
app.set('port', config.get('port'));
var server = http.createServer(app);
server.listen(config.get('port'), config.get('host'));
server.on('listening', function () {
    console.log("Server started and listening on " + config.get('host') + ":" + config.get('port'));
});
