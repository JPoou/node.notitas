var Keycloak = require('keycloak-connect');

var createError = require('http-errors');
var express = require('express');
var session = require('express-session');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');

//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
var notesRouter = require('./routes/notes');

var app = express();


var session = require('express-session');
var memoryStore = new session.MemoryStore();

app.use(session({
  secret: 'mySecret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));

var keycloak = new Keycloak({ store: memoryStore })

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/', function (req, res) {
  res.send('index');
});


app.get('/demo', keycloak.protect(), function (req, res) {
  res.send('demo');
});


// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

//app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use('/notes', notesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(res.locals.error)
  // render the error page
  res.status(err.status || 500);
  res.send('error');
});






module.exports = app;
//module.exports = router;
