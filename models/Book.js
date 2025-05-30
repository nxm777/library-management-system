const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  author: {
    first_name: {
      type: String,
      required: [true, 'First name is required']
    },
    last_name: {
      type: String,
      required: [true, 'Last name is required']
    }
  },
  isbn: {
    type: String,
    required: [true, 'ISBN is required'],
    unique: true
  },
  publisher: {
    type: String,
    required: [true, 'Publisher is required']
  },
  genres: {
    type: [String],
    default: []
  },
  numOfPages: {
    type: Number,
    required: [true, 'Number of pages is required']
  },
  publicationYear: {
    type: Number,
    required: [true, 'Publication year is required']
  },
  rating: {
    average: {
      type: Number,
      default: 0
    },
    count: {
      type: Number,
      default: 0
    }
  }
}, {versionKey: false});

module.exports = mongoose.model('Book', bookSchema);
