const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const { response } = require('express');
let formData;

function postDatabase(data) {
    let userData;
    let response = {};
    fs.readFile('user_database.json', 'utf-8', function(err, json) {
        if (err) return console.error(err);
        userData = JSON.parse(json);
        userData[data.username] = {
            password: data.password
        };
        if (!data.username in userData) {
            fs.writeFile('user_database.json', JSON.stringify(userData), function(err) {
                if (err) return console.error(err);
                console.log('Updated user database');
            });
        } else {
            console.error('User Already Exists');
            response.userExists = true;
        }
    });
    return JSON.stringify(response);
}

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
    let responseObj = postDatabase(formData);
    res.sendFile(path.resolve(__dirname, 'form.html'));
    app.get('/', (req, res) => {
        res.send(responseObj);
    });
});