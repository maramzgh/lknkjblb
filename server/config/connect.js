const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://maram:mongodbtrial@cluster0.xus4tzx.mongodb.net/YachtInfos';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('connected');
}).catch((err) => {
  console.log(err);
});

module.exports = {
  mongoose,
  mongoURI
};
