var ANIMALS_MOCK_DATABASE = [{
    "name": "Neko",
    "type": "cat"
}, {
    "name": "Fido",
    "type": "dog"
}, {
    "name": "Mufasa",
    "type": "lion"
}, {
    "name": "Tony",
    "type": "tiger"
}, {
    "name": "Kuma",
    "type": "bear"
}];

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, 'static')));

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/animals', function(req, res) {
    res.render('animals/index', { animals: ANIMALS_MOCK_DATABASE });
});

app.get('/animals/:id', function(req, res) {
    var theAnimal = ANIMALS_MOCK_DATABASE[req.params.id];
    var data = {
        animal: theAnimal,
        owner: "Connor"
    };

    res.render('animals/show', data);
});

// this comes from ajax
// using "res.redirect" here won't actually
// redirect the browser, must do that in
// the ajax response object
app.post('/animals', function(req, res) {
    console.log("Something got posted.");
    var newAnimal = {
        name: req.body['animal-name'],
        type: req.body['animal-type']
    };

    ANIMALS_MOCK_DATABASE.push(newAnimal);

    res.redirect('/animals');
});

app.delete('/animals/:id', function(req, res) {
    // delete one item starting at index req.params.id
    ANIMALS_MOCK_DATABASE.splice(req.params.id, 1);

    res.send('Deleted!');
});

app.listen(3000);
