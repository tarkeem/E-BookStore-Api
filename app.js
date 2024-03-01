var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

var userRouter = require('./routes/auth.route');
var orderRouter = require('./routes/order.route');
var productRouter = require('./routes/product.route');
var cartRouter = require('./routes/cart.route');
var commentRouter = require('./routes/comment.router');

var app = express();
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


mongoose.connect('mongodb://localhost/book-store').then((va)=>{
console.log("connect to dp")
}).catch(()=>{
  console.log("error to connect to db")
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/v1/user',userRouter );
app.use('/v1/order',orderRouter );
app.use('/v1/book',productRouter );
app.use('/v1/cart',cartRouter );
app.use('/v1/comment',commentRouter );


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
