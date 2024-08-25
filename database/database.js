const mongoose = require('mongoose');

const db = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/details');
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed:', error);
    }
};

module.exports = db;
