const mongoose = require('mongoose');

mongoose
  .connect(
    'mongodb+srv://maram:mongodbtrial@cluster0.xus4tzx.mongodb.net/YachtInfos',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log('connected');
  })
  .catch((err) => {
    console.log(err);
  });

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = {
  User: User,
  mongoose: mongoose,
};
