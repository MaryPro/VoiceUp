const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
  username: String,
  score: Number,
  date: {type: Date, default: Date.now()}
})


module.exports = mongoose.model('User', userSchema);
