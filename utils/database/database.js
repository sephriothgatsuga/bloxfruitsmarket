const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })

module.exports = client.connect()
/* 
const mongoose = require('mongoose');

module.exports = mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true }); */