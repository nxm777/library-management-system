require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT;
const connectToDatabase = require('./database');
const authRoutes = require("./routes/auth");


const app = express();

app.use(express.json());

connectToDatabase();

app.use('/api/books', require('./routes/books'));
app.use("/api/auth", authRoutes);
app.use("/api/reading-lists", require('./routes/readingLists'));


app.get('/', (req, res) => {
    res.send("Main page");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})