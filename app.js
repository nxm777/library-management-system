require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT;
const connectToDatabase = require('./database');

const app = express();

app.use(express.json());

const cors = require("cors");
app.use(cors());

connectToDatabase();

app.use('/api/books', require('./routes/books'));

app.get('/', (req, res) => {
    res.send("Main page");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})