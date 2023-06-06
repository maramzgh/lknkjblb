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
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

module.exports = mongoose;