'use strict';
const Sequelize = require('sequelize');


module.exports = (sequelize) => {

  class Book extends Sequelize.Model {}

  Book.init({

    title: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: {
          msg: 'Please provide a value for "Title" ',
        }, 
      }
    },

    author: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: {
          msg: 'Please provide a value for "Author" ',
        }, 
      }
    },

    genre:  {
      type: Sequelize.STRING
    },

    year: {
      type: Sequelize.INTEGER
    }

  }, {
    sequelize,
    modelName: 'Book',
  });

  return Book;
};

