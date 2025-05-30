const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.get('/', (req, res) => {
    res.send("Main page");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})