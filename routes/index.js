const express = require('express')
const User = require('../models/users')

const router = express.Router()

router.get('/', async (req,res) => {
  const allLeaders = await User.find({})
  const sortLeaderBoard = allLeaders.sort((a,b) => b.score-a.score)
  //очищение бд
  sortLeaderBoard.slice(6).forEach(async(el) => {
    await User.findByIdAndDelete(el._id)
  })

  const leaderBoard = sortLeaderBoard.slice(0,5)
  res.render('index', {
    title: 'Voice Up',
    leaderBoard
  })
})

router.post('/addName', async (req, res) => {
  const {username} = req.body
  res.json(username); 
})

router.post('/addUser', async (req, res) => {
  const {username, score} = req.body
  const newUser = new User({
    username,
    score
  })
  await newUser.save();
  res.json(newUser);
})

module.exports = router
