const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require("../model/register");

exports.userLogin = async (req, res) => {

  //Checking if email already exist
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({message: 'Email doesnt exit'});

  //PASSWORD IS CORRECT
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send({message: 'Invalid Password'});

  //Create Token and assign
  const token = jwt.sign({ Details: user }, 'secret', {
    expiresIn: '1h'
  });
  res.header('Authorization', token).json({ message: 'User Logged in', user, token }).status(201);
  
};