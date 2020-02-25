const path = require('path');
const express = require('express');
const hbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const User = require('./models/user');

const app = express();
require('dotenv').config();

mongoose.connect(`mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster1-oi5ib.mongodb.net/test?retryWrites=true&w=majority`, {
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
    res.render('index');
});

app.post('/', async (req, res) => {
    let username = req.body.username;
    let password = req.body.password
    console.log(username);
    console.log(password);

    // creates new user in our database

    // const user = new User({
    //     username: username,
    //     password: password
    // });
    
    // user.save();
});


app.listen(3000, () => {
    console.log("server listening on port 3000");
});