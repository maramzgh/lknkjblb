const express = require('express');
const { User, mongoose } = require('./config/connect');
const cors = require('cors');
const Yacht = require('./models/yacht');
require('./config/connect');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended:true}));
app.use(cors());


app.get("/", cors(),(req, res)=>{

})


//controllers
app.get('/voiliers/', async (req, res) => {
  try {
    const voiliers = await Yacht.find();
    res.send(voiliers);
  } catch (err) {
    res.status(500).send(err);
  }
});

// get voiliers by id
app.get('/voiliers/:id', async (req, res) => {
  try {
    const voilier = await Yacht.findById(req.params.id);
    res.send(voilier);
  } catch (err) {
    res.status(500).send(err);
  }
});

// get random voiliers
app.get('/random-voiliers', async (req, res) => {
  try {
    const randomVoiliers = await Yacht.aggregate([{ $sample: { size: 8 } }]);
    res.send(randomVoiliers);
  } catch (err) {
    res.status(500).send(err);
  }
});
//connect button thing
app.post('/', async (req, res) => {
  const { email, password } = req.body;
  try {
    const check = await User.findOne({email:email});
    if (check){
      res.json("exist");
    }else{
      res.json("not exist");
    }
    }
  catch (err) {
    res.status(500).send(err);
  }
});

// Register a new user
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const userData = {
    username: username,
    email: email,
    password: password,
  };

  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      res.status(409).json({ message: 'User already exists' });
    } else {
      const newUser = new User(userData);
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });
    }
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ message: 'Failed to register user' });
  }
});


//server port listen
app.listen(5000, () => {
  console.log('Server is listening on port 5000');
});
