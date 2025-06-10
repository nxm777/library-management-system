const express = require('express');
const router = express.Router();
const readingListController = require('../controllers/readingListController');

const verifyToken = require('../middleware/auth');

router.post('/', verifyToken, readingListController.createReadingList);
router.delete('/:listId', verifyToken, readingListController.deleteReadingList);

router.get('/:listId', verifyToken, readingListController.getReadingList);
router.post('/:listId/books', verifyToken, readingListController.addBookToList);
router.delete('/:listId/books/:bookId', verifyToken, readingListController.removeBookFromReadingList);

module.exports = router;
