const express = require('express');
const router = express.Router();
const { Book } = require('../models');

/***  Handler function to wrap each route ***/
function asyncHandler(cb){

  return async(req, res, next) => {

    try {

      await cb(req, res, next);

    } catch(error){
        console.log(error);
        res.locals.message = error.message;
        res.status(error.status || 500);
        res.render('books/error');
      
    }

  }

}

/*** get / - Shows the full list of books ***/
router.get( '/', asyncHandler( async( req, res ) => {

  let books = [];
  books = await Book.findAll( { order: [["title", "ASC"]] });
  res.render('books/index', { books, title: 'Library List'});

}));

/*** get /books/new - Shows the create new book form ***/
router.get( '/new', ( req, res) => {

  res.render('books/new-book', { book: {}, title: 'New Book'}); //renders the pug file name

});

/*** post /books/new-book - Posts a new book to the database ***/
router.post( '/', asyncHandler( async( req, res ) => {

  let book;

  try {
    book = await Book.create(req.body);
    res.redirect('/books/' + book.id );

  } catch(error) {
    if(error.name === 'SequelizeValidationError') {
      book = await Book.build(req.body);
      res.render( 'books/new-book', { book, errors: error.errors, title: 'New Book' })
    } else {
      throw error('Hang on a second! There was a problem with that book...');
    }

  }

}));

/*** get /:id - Shows book detail form ***/
router.get( '/:id', asyncHandler( async(req, res) => {

  const book = await Book.findByPk(req.params.id);

  if (book) {
    res.render('books/update-book', { book, title: book.title });
  } else {
    res.sendStatus(404);
  }

}));

/*** post /:id/ - Updates book info in the database ***/
router.post( '/:id', asyncHandler( async(req, res) => {

  let book;

  try {

    book = await Book.findByPk(req.params.id);
    if(book) {
      await book.update(req.body);
      res.redirect('/books/' + book.id);
    } else {
      res.sendStatus(404);
    }

  } catch(error) {

    if(error.name === 'SequelizeValidationError') {
      book = await Book.build(req.body);
      book.id = req.params.id;
      res.render( 'books/update-book', { book, errors: error.errors, title: 'Edit Book' })
    } else {
      throw error('Hang on a second! There was a problem with that book...');
    }

  }

}));

/*** get /:id/delete - Delete book form. ***/
router.get( '/:id', asyncHandler( async(req, res) => {

  const book = await Book.findByPk(req.params.id);

  if (book) {
    res.render('books/delete', { book, title: 'Delete Book' });
  } else {
    res.sendStatus(404);

  }

}));

/*** post /:id/delete - Deletes a book. ***/
router.post('/:id/delete', asyncHandler(async (req ,res) => {

  const book = await Book.findByPk(req.params.id);

  if(book) {
    await book.destroy();
    res.redirect('/books/');
  } else {
    res.sendStatus(404);

  }

}));




module.exports = router;
