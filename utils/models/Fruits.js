const mongoose = require('mongoose');

const FruitSchema = new mongoose.Schema({
    name: String,
    bprice: String,
    rprice: String,
    type: String,
    abilevels: String,
    instock: Boolean
});

const Fruit = module.exports = mongoose.model('Fruit', FruitSchema, 'fruits');