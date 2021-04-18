const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const { User } = require('../models/user');


// @Route POST users/register
// @decs  Register user 
// @access Public
const register = async (req, res) => {
  
  // Validation 
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array()
    });
  }

  const { email, password, firstName, lastName } = req.body;

  try { 
    // Check already email
    const existingUser = await User.findOne({ email });
    if(existingUser) return res.status(400).json({ message: "아이디가 이미 있습니다."});

    // Check equal password == confirmPassword -> Client 단에서 수행 
    // if (password !== confirmPassword) return res.status(400).json({ message: "비밀번호가 일치하지 않습니다."})

    // hashed password 
    const hashedPassword = await bcrypt.hash(password, 12);

    // Save User
    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`
    });

    // Generate Token
    const token = jwt.sign({
      email: result.email,
      id: result._id
    }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    // User Information and Token sended to Client
    res.status(200).json({
      id: result._id,
      email: result.email,
      name: result.name,
      token: token 
    })

  } catch (error) {
    res.status(500).json({ message: `Something is wrong !! `})
  }
};


// @Route POST users/login
// @decs  Register user 
// @access Public
const login = async (req, res) => {
  
  // Validation 
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array()
    });
  }

  const { email, password } = req.body;

  try { 
    // Check Email Existing
    const existingUser = await User.findOne({ email });
    if(!existingUser) return res.status(400).json({ message: "아이디가 없습니다."});

    // Compare Password 
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if(!isPasswordCorrect) return res.status(400).json({ message: "비밀번호가 맞지 않습니다."});

    // Generate Token
    const token = jwt.sign({
      email: existingUser.email,
      id: existingUser._id
    }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    // User information and Token sended to Client
    res.status(200).json({
      id: existingUser._id,
      email: existingUser.email,
      name: existingUser.name,
      token: token 
    })

  } catch (error) {
    res.status(500).json({ message: `Something is wrong !! `})
  }
};



module.exports = {
  register,
  login
}