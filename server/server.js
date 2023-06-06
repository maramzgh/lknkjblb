const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');

require('./config/connect');
const Yacht = require('./models/yacht');
const User = require('./models/user');

const app = express();

const secretKey = '123456';

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Controllers

app.get('/voiliers/', async (req, res) => {
  try {
    const voiliers = await Yacht.find();
    res.send(voiliers);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/voiliers/names', async (req, res) => {
  try {
    const sailboatNames = await Yacht.find({}, 'Nom');
    const names = sailboatNames.map((sailboat) => sailboat.Nom);
    res.send({ names });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/voiliers/:id', async (req, res) => {
  try {
    const voilier = await Yacht.findById(req.params.id);

    if (!voilier) {
      return res.status(404).send('Sailboat not found');
    }

    voilier.visitors++;
    await voilier.save();

    res.send(voilier);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/voiliers/name/:name', async (req, res) => {
  try {
    const voilier = await Yacht.findOne({ Nom: req.params.name });

    if (!voilier) {
      return res.status(404).send('Sailboat not found');
    }

    res.send(voilier);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/random-voiliers', async (req, res) => {
  try {
    const randomVoiliers = await Yacht.aggregate([{ $sample: { size: 8 } }]);
    res.send(randomVoiliers);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
      role: 'User', // Set the default role to 'User'
      favoriteSailboats: [], // Initialize as an empty array
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ message: 'Failed to register user' });
  }
});

//login
app.post('/login', cors(), async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const tokenPayload = {
          userId: user._id.toString(),
          username: user.username,
          role: user.role,
        };

        const token = jwt.sign(tokenPayload, secretKey, { expiresIn: '1h' });


        res.status(200).json({
          message: 'Login successful',
          token: token,
          username: user.username,
          userId: user._id.toString(),
          role: user.role,
        });
        
      } else {
        res.status(401).json({ message: 'Incorrect password' });
      }
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'An error occurred during login' });
  }
});
// display all users
app.get('/allusers', async (req, res) => {
  try {
    const users = await User.find({ role: 'user' }); // Filter users by role: 'user'

    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

//get a user
app.get('/users/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).where('role').equals('user'); // Filter user by role: 'user'

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error('Error retrieving user:', err);
    res.status(500).json({ message: 'Failed to retrieve user' });
  }
});

// add favoriteSailboats
app.post('/users/:userId/favorite', async (req, res) => {
  const { userId } = req.params;
  const { sailboatId } = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Push the sailboat ID into the favoriteSailboats array
    user.favoriteSailboats.push(Number(sailboatId)); // Convert sailboatId to a number if needed

    // Save the updated user
    await user.save();

    res.json({ message: 'Sailboat added to favorites' });
  } catch (error) {
    console.error('Error adding sailboat to favorites:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Fetch favorites for a user
app.get('/users/:userId/favorites', async (req, res) => {
  const { userId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ favorites: user.favoriteSailboats });
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
app.delete('/users/:userId/favorites/remove', async (req, res) => {
  try {
    const userId = req.params.userId;
    const sailboatId = req.body.sailboatId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const index = user.favoriteSailboats.indexOf(sailboatId);
    if (index !== -1) {
      user.favoriteSailboats.splice(index, 1);
      await user.save();
    }

    res.json({ message: 'Sailboat removed from favorites' });
  } catch (err) {
    console.error('Error removing sailboat from favorites:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});
//update user
app.put('/users/:userId', async (req, res) => {
  const { userId } = req.params;
  const { username, email } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user properties
    user.username = username;
    user.email = email;

    // Save the updated user
    await user.save();

    res.json({ message: 'User updated', user });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ message: 'Failed to update user' });
  }
});

//delete user
app.delete('/deleteusers/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await User.deleteOne({ _id: userId }); // Use deleteOne instead of remove
    res.json({ message: 'User deleted' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//number of users
app.get('/userCount', async (req, res) => {
  try {
    const userCount = await User.countDocuments({ role: 'user' });
    res.json({ count: userCount });
  } catch (err) {
    console.error('Error counting users:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});
//number of admin
app.get('/adminCount', async (req, res) => {
  try {
    const adminCount = await User.countDocuments({ role: 'Admin' });
    res.json({ count: adminCount });
  } catch (err) {
    console.error('Error counting admins:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//number of voiliers
app.get('/voilierCount', async (req, res) => {
  try {
    const voilierCount = await Yacht.countDocuments();
    res.json({ count: voilierCount });
  } catch (err) {
    console.error('Error counting voiliers:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(5000, () => {
  console.log('Server is listening on port 5000');
});