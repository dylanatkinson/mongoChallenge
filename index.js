const path = require('path');
const express = require('express');
const hbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const getUsers = require('./lib/getUsers');

const app = express();
require('dotenv').config();

mongoose.connect(`mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster1-oi5ib.mongodb.net/test?retryWrites=false&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('.hbs', hbs({
    defaultLayout: 'layout',
    extname: '.hbs'
}));

app.set('view engine', '.hbs');

app.get('/', (req, res) => {
    res.render('index', { title: "UK Weather App - Login/Signup" });
});

app.post('/', async (req, res) => {
    let username = req.body.username;
    let password = req.body.password

    let docs = await getUsers(username, password);

    console.log(docs);

    if (docs.length > 0) {
        res.render('index', {err: "A user with this username already exists."});
        return;
    }
    res.render('signup');
});


app.listen(3000, () => {
    console.log("server listening on port 3000");
});