var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var course = require('./routes/courseHandler');
var student = require('./routes/studentHandler');
var router = require('./routes/routerHandler');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// handle http request
// course service
app.get('/course/:cid', course.readCourse);
app.put('/course/:cid/:uni', course.addStudent);
app.put('/course/:cid', course.createCourse);
app.post('/course/:cid', course.updateCourse);
app.delete('/course/:cid', course.deleteCourse);
app.delete('/course/:cid/:uni', course.deleteStudent);
app.patch('/course/add/:field', course.addField);
app.patch('/course/delete/:field', course.deleteField);

// student service
app.get('/student/:uni', student.readStudent);
app.put('/student/:uni/:cid', student.addCourse);
app.put('/student/:uni', student.createStudent);
app.post('/student/:uni', student.updateStudent);
app.delete('/student/:uni', student.deleteStudent);
app.delete('/student/:uni/:cid', student.deleteCourse);
app.patch('/student/add/:field', student.addField);
app.patch('/student/delete/:field', student.deleteField);

// router
app.patch('/router/:service/:name/:ip/:port', router.config);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
