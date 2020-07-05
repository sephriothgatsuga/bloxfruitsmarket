const mongoose = require('mongoose');
const uri = process.env.DATABASE;
module.exports = mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });