const { Schema, model, Mongoose } = require('mongoose')

const Article = new Schema({
  userID: { type: Schema.Types.ObjectId, ref: 'User' },
  heading: { type: String, unique: false },
  value: { type: String, unique: false },
  category: { type: String, unique: false },
})

module.exports = model('Article', Article);
