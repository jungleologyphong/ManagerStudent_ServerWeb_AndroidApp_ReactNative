const mongoose = require('mongoose');

const Book = new mongoose.Schema({
    idBook: {
        type: String,
        required:true,
    },
    nameBook: {
        type: String,
        required:true,
    },
    kindOfBook: {
        type: String,
        required:true,
    },
    mentor: {
        type: String,
        required:true,
    },
    fromBook: {
        type: String,
        required:true,
    }
}) 

module.exports = mongoose.model("Book", Book);