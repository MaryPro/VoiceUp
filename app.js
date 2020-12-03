const express = require('express')
const config = require('./middleware')

const indexRouter = require('./routes/index.js')

const app = express()

config(app)

app.use('/', indexRouter),

module.exports = app
