const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
let formData;

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'form.html'));
});

app.post('/', (req, res) => {
    formData = req.body;
    res.sendFile(path.resolve(__dirname, 'form.html'));
    console.log(`Type: ${typeof(formData)} || Object: ${formData.username}, ${formData.password}`);
});