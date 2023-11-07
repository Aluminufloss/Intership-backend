const {Schema, model} = require('mongoose')

const Category = new Schema({
  label: {type: String, unique: false},
  value: {type: String, unique: true},
});

module.exports = model('Category', Category);