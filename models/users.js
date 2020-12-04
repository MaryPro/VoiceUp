const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
  username: {type: String, default: 'NoName'},
  score: Number,
  date: {type: Date, default: Date.now()}
})


module.exports = mongoose.model('User', userSchema);
