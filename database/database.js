const mongoose = require('mongoose');

const db = async () => {
    let dbs = await mongoose.connect('mongodb://127.0.0.1:27017/details')
    .then(() => console.log('connected'))
    .catch(error => console.log(error));
    return dbs;
}

module.exports = db