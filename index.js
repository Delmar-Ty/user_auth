const express = require('express');
const path = require('path');

const app = express();
app.use(express.static('public'));
const port = 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'form.html'));
});