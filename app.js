const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Setting view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Array untuk menyimpan data
let data = [
    { id: 1, name: 'rifqah', age: 22, disease: 'Flu' },
    { id: 2, name: 'veli', age: 23, disease: 'demam' }
];





app.get('/', (req, res) => {
    res.render('index', { data });
});


app.post('/add', (req, res) => {
    const { name, age, disease } = req.body;
    const newId = data.length + 1; 
    const newData = { id: newId, name, age, disease };
    data.push(newData);  
    res.redirect('/');  
});


app.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    const record = data.find(item => item.id == id);
    res.render('edit', { data: record });
});


app.post('/update/:id', (req, res) => {
    const id = req.params.id;
    const { name, age, disease } = req.body;
    const index = data.findIndex(item => item.id == id);
    if (index !== -1) {
        data[index] = { id, name, age, disease }; 
    }
    res.redirect('/'); 
});


app.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    data = data.filter(item => item.id != id); 
    res.redirect('/'); 
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
