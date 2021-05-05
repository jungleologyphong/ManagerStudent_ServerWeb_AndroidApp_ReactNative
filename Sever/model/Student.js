const mongoose = require('mongoose');

const Student = new mongoose.Schema({
    nameStudent: {
        type: String,
        required:true,
    },
    codeStudent: {
        type: String,
        required:true,
    },
    careerStudent: {
        type: String,
        required:true,
    },
    dateOfBirthStudent: {
        type: String,
        required:true,
    }
}) 

module.exports = mongoose.model("Students", Student);