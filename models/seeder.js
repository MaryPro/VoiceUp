const mongoose = require('mongoose')
const User  = require('./users')

const cloudDb = 'mongodb+srv://Admin:admin@cluster0.gj37x.mongodb.net/VoiceUp';

const dbConnect = () => {
  mongoose.connect(cloudDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
};

dbConnect()

async function seedr() {
  const user0 = await new User({
    username: 'Anna',
    score: 100,
  })
  const user1 = await new User({
    username: 'Mary',
    score: 500,
  })
  await user0.save();
await user1.save();
}
seedr()
