const mongoose = require('mongoose');

const randomMsg = new mongoose.Schema({
    msg: String
});

const randomMsgs = module.exports = mongoose.model('randomMsg', randomMsg, 'randomMsgs');