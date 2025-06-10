const mongoose = require('mongoose');
const { Schema } = mongoose;

const readingListSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: [true, "Title must be unique"]
  },
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  books: [
    {
      bookId: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: false
      }
    }
  ],
  tags: [String]
}, {versionKey: false});

module.exports = mongoose.model('ReadingList', readingListSchema);
