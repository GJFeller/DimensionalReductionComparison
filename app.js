var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var glob = require('glob')

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

var router = express.Router();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(router);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

router.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    res.header("Access-Control-Allow-Methods", "GET, POST","PUT");
    next();
});

router.get('/semesterList', function(req, res){
  var semesterList = [];
  //console.log("HUEHUEHUEHUEHUEHUE");
  glob("public/data/semesters/PCA/*.json", function(er, files) {
    files.forEach(function(file) {
      var filename = path.parse(file).name
      //console.log(filename);
      semesterList.push(filename);
    });
    console.log(semesterList);
    res.send(semesterList);
  });
  
  
});

router.get('/deputies', function(req, res){
  var jsonData;
  fs.readFile(path.join(__dirname, 'public/data/deputiesID.json'), function (err, data) {
    if(err) {
      res.send([]);
      throw err;
    }
    jsonData = JSON.parse(data);
    res.send(jsonData);
  });
});

router.get('/voting/:semester', function (req, res) {
  var semester = req.params.semester;
  //var semester = '2013-1';
  console.log(semester);
  var jsonData;
  fs.readFile(path.join(__dirname, 'public/data/semesters/'+semester+'.json'), function (err, data) {
    if(err) {
      res.send([]);
      throw err;
    }
    jsonData = JSON.parse(data);
    res.send(jsonData);
  });
});

router.get('/PCA/:semester', function (req, res) {
  var semester = req.params.semester;
  //var semester = '2013-1';
  console.log(semester);
  var jsonData;
  fs.readFile(path.join(__dirname, 'public/data/semesters/PCA/'+semester+'.json'), function (err, data) {
    if(err) {
      res.send([]);
      throw err;
    }
    jsonData = JSON.parse(data);
    res.send(jsonData);
  });
});

router.get('/MDS/:semester', function (req, res) {
  var semester = req.params.semester;
  //var semester = '2013-1';
  console.log(semester);
  var jsonData;
  fs.readFile(path.join(__dirname, 'public/data/semesters/MDS/'+semester+'.json'), function (err, data) {
    if(err) {
      res.send([]);
      throw err;
    }
    jsonData = JSON.parse(data);
    res.send(jsonData);
  });
});

router.get('/Sammon/:semester', function (req, res) {
  var semester = req.params.semester;
  //var semester = '2013-1';
  console.log(semester);
  var jsonData;
  fs.readFile(path.join(__dirname, 'public/data/semesters/Sammon/'+semester+'.json'), function (err, data) {
    if(err) {
      res.send([]);
      throw err;
    }
    jsonData = JSON.parse(data);
    res.send(jsonData);
  });
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


/// error handlers

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
