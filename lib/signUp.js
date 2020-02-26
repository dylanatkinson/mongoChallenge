const User = require('./models/user');

// creates new user in our database
const user = new User({
    username: username,
    password: password
});

user.save();