// import express
const express = require('express');
//import the connect file
const app = express();

// import the connect file
const mongoose = require('mongoose');
require('./config/connect');

// import yacht model
const Yacht = require('./models/yacht');

const User = require('./models/user');
//import multer
//const multer = require('multer');

//const upload = multer({ storage: multer.memoryStorage() });


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


//Import your User model and any other necessary dependencies

app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Create a new user document
  const user = new User({
    username,
    email,
    password
  });

  // Save the user document to the database
  try {
    await user.save();
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to register user' });
  }
});

app.listen(5000, () => {
  console.log('Server is listening on port 5000');
});
