let User = require('../models/user');

const getUsers = (username, password) => {
    return new Promise((resolve, reject) => {
        User.find({ username, password }, (err, docs) => {
            resolve(docs);
        });
    });
};

module.exports = getUsers;