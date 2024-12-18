const mongoose = require('mongoose');

// User Schema Define
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6, 
    }
});


const User = mongoose.model('User', userSchema);

module.exports = User;
