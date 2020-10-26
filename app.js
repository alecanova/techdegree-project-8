const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const { sequelize, Book } = require('./models');

const routes = require('./routes/index');
const books = require('./routes/books');

const app = express();

//async IIFE
(async () => {
  console.log('Testing the connection to the database...');
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

//Sync tables
(async () => {
  await Book.sequelize.sync({ force: true });
}) ();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/books', books);

/* 404 handler to catch undefined or non-existent route requests */  
app.use((req, res, next) => {

  const err = new Error('Not Found');
  err.status = 404;
  err.message = "Oops! Looks like the page doesn't exist."

  next(err);

});

/* Error handler */
app.use ( (err, req, res, next) => {

  // Set locals
  res.locals.error = err;
  res.locals.message = err.message;
  // Render error page
  res.status(err.status || 500);
  console.log(err.message);
  res.render('page-not-found');

});

module.exports = app;
