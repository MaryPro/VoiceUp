const express = require('express')
const hbs = require('hbs')
const path = require('path')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const sessionFileStore = require('session-file-store')

const { cookiesCleaner } = require('./auth')
const dbConnect = require('./db')

const FileStore = sessionFileStore(session);

const config = (app) => {
  dbConnect();

  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())

  app.use(cookieParser())

  app.use(
    session({
      store: new FileStore(),
      name: 'user_sid',
      secret: 'banan',
      resave: true,
      saveUninitialized: false,
      cookie: {
        expires: 600000,
        httpOnly: true,
      }
    })
  )

  app.use(cookiesCleaner)

  app.use(express.static(path.join(__dirname, '..', 'public')))

  app.set('view engine', 'hbs')
  app.set('views', path.join(__dirname, '..', 'views'))
}

module.exports = config
