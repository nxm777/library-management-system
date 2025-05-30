const Book = require('../models/Book');

exports.getAllBooks = async (req, res) => {

    const queryObj = {};

    if (req.query.author) {
        queryObj['author.last_name'] = req.query.author;
    }

    if (req.query.genre) {
        queryObj.genres = req.query.genre;
    }

    let sortBy = {};
    if (req.query.sort) {
      const fields = req.query.sort.split(',').join(' ');
      sortBy = fields;
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const skip = (page - 1) * limit;
    
    try {
        const books = await Book.find(queryObj)
        .sort(sortBy)
        .skip(skip)
        .limit(limit);

        const total = await Book.countDocuments(queryObj);

        res.json({
            total,
            page,
            totalPages: Math.ceil(total / limit),
            data: books
          });

      } catch (err) {
        res.status(500).json({ message: err.message });
      }
};

exports.getBookById = async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) return res.status(404).json({ message: 'Book not found' });
      res.json(book);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};

exports.createBook = async (req, res) => {
    const book = new Book(req.body);
    try {
      const saved = await book.save();
      res.status(201).json(saved);
      console.log('Book created:', saved);
    } catch (err) {
        if (err.code === 11000) {
          const field = Object.keys(err.keyValue)[0];
          return res.status(400).json({ message: `${field} must be unique` });
        }
        res.status(500).json({ message: err.message });
      }
  };

exports.updateBook = async (req, res) => {
    try {
      const updated = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updated) return res.status(404).json({ message: 'Book not found' });
      res.json(updated);
        console.log('Book updated:', updated);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

exports.deleteBook = async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await Book.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ message: 'Książka nie została znaleziona lub nie mogła zostać usunięta' });
        }
        res.status(200).json({ message: 'Książka została usunięta' });
        console.log('Book deleted:', deleted);

    } catch (err) {
        res.status(400).json({ message: err.message });
      }
  

  

};