const jwt = require('jsonwebtoken');// import jwt for token generation
const User = require('../models/User'); //import mongoose schema

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};//to generate jwt token

//register a new user
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });//checks same email id already exist
    if (existing) return res.status(400).json({ message: 'Email already exists' });
  
    const user = await User.create({ name, email, password });//creates new user in database
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//login existing user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;//extract
    const user = await User.findOne({ email }); //find user by email
    if (user && (await user.matchPassword(password))) {//check password maches
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
