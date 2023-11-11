const {Schema, model} = require('mongoose')

const Category = new Schema({
  label: {type: String, unique: false},
  value: {type: String, unique: false},
});

module.exports = model('Category', Category);