const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const connectionAddress = 'mongodb+srv://Admin:admin@cluster0.gj37x.mongodb.net/VoiceUp'

// const connectionAddress = `mongodb+srv://${process.env.DATABASE_LOGIN}:${process.env.DATABASE_PASSWORD}@cluster0.gj37x.mongodb.net/${process.env.DATABASE_NAME}`

const dbConnect = () => {
  mongoose.connect(connectionAddress, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
};

module.exports = dbConnect
