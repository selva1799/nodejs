const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: String, 
    lastname: String, 
    dob: Date,
    email: String,
    phone: String
});

module.exports = mongoose.model('users', userSchema);