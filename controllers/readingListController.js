const ReadingList = require('../models/ReadingList');
const mongoose = require('mongoose');

exports.createReadingList = async (req, res) => {
  const { title, tags } = req.body;
  const ownerId = req.user.id;

  if (!title) {
    return res.status(400).json({ message: 'Tytuł listy jest wymagany.' });
  }

  try {
    const newList = new ReadingList({
      title,
      tags: tags || [],
      ownerId
    });

    await newList.save();
    res.status(201).json({ message: 'Lista czytelnicza utworzona.', readingList: newList });
  } catch (error) {
    res.status(500).json({ message: 'Błąd serwera.', error });
  }
};

exports.getReadingList = async (req, res) => {
  const { listId } = req.params;
  const userId = req.user.id;

  try {
    const list = await ReadingList.findById(listId)
      .populate('books.bookId')
      .populate('ownerId', 'username email');

    if (!list) {
      return res.status(404).json({ message: 'Lista nie znaleziona.' });
    }

    if (list.ownerId._id.toString() !== userId) {
      return res.status(403).json({ message: 'Brak dostępu do tej listy.' });
    }

    res.status(200).json({ readingList: list });
  } catch (error) {
    res.status(500).json({ message: 'Błąd serwera.', error });
  }
};

exports.deleteReadingList = async (req, res) => {
  const { listId } = req.params;
  const userId = req.user.id;

  try {
    const list = await ReadingList.findById(listId);

    if (!list) {
      return res.status(404).json({ message: 'Lista nie znaleziona.' });
    }

    if (list.ownerId.toString() !== userId) {
      return res.status(403).json({ message: 'Brak uprawnień do usunięcia tej listy.' });
    }

    await list.deleteOne();
    res.status(200).json({ message: 'Lista została usunięta.' });
  } catch (error) {
    res.status(500).json({ message: 'Błąd serwera.', error });
  }
};

exports.addBookToList = async (req, res) => {
  const { listId } = req.params;
  const { bookId } = req.body;
  const userId = req.user.id;

  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    return res.status(400).json({ message: 'Nieprawidłowy ID książki.' });
  }

  try {
    const list = await ReadingList.findById(listId);

    if (!list) {
      return res.status(404).json({ message: 'Lista nie znaleziona.' });
    }

    if (list.ownerId.toString() !== userId) {
      return res.status(403).json({ message: 'Brak uprawnień do edycji tej listy.' });
    }

    const alreadyExists = list.books.some(book => book.bookId.toString() === bookId);
    if (alreadyExists) {
      return res.status(409).json({ message: 'Książka już znajduje się na liście.' });
    }

    list.books.push({ bookId });
    await list.save();

    res.status(200).json({ message: 'Książka dodana do listy.', readingList: list });
  } catch (error) {
    res.status(500).json({ message: 'Błąd serwera.', error });
  }
};

exports.removeBookFromReadingList = async (req, res) => {
  const { listId, bookId } = req.params;
  const userId = req.user.id;

  try {
    const readingList = await ReadingList.findOne({ _id: listId, ownerId: userId });

    if (!readingList) {
      return res.status(404).json({ message: 'Lista czytelnicza nie znaleziona lub brak dostępu.' });
    }

    const updatedBooks = readingList.books.filter(book => book.bookId.toString() !== bookId);

    if (updatedBooks.length === readingList.books.length) {
      return res.status(404).json({ message: 'Książka nie znaleziona na liście.' });
    }

    readingList.books = updatedBooks;
    await readingList.save();

    res.status(200).json({ message: 'Książka została usunięta z listy.', readingList });
  } catch (error) {
    res.status(500).json({ message: 'Błąd serwera.', error });
  }
};