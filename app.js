require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectToDatabase = require('./database');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

connectToDatabase();

app.use('/api/books', require('./routes/books'));

app.get('/', (req, res) => {
    res.send("Main page");
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'Test OK' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});