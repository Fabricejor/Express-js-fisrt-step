var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var servicesRouter = require('./routes/services');
var contactRouter = require('./routes/contact');
var usersRouter = require('./routes/users');
var checkWorkingHours = require('./Checkingworking')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/services', servicesRouter);
app.use('/contact', contactRouter);
app.use('/users', usersRouter);

// Route pour la page des services
app.get('/services', (req, res) => {
    res.render('services');
});

// Route pour la page de contact
app.get('/contact', (req, res) => {
    res.render('contact');
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
app.use(express.static('public'));


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//! definition du middleware
// server.js


const PORT = 3002;



app.use(checkWorkingHours);

// Importer les autres modules nécessaires et définir les itinéraires ici...

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
