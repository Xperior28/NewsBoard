import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/features.js'

const registerUser = async(req, res) => {
    const { username, email, password } = req.body;
    console.log(username, email, password);
    try {
        const userExists = await User.findOne({ email });
    
        if (userExists) {
          return res.status(400).json({ message: 'User already exists' });
        }

         // Check if the password is defined
        if (!password) {
          return res.status(400).json({ message: 'Password is required' });
        }
      
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const user = await User.create({
          username,
          email,
          password: hashedPassword,
        });
    
        res.status(201).json({
          _id: user._id,
          username: user.username,
          email: user.email,
          message: 'User registered successfully',
        });
    } catch (error) {
        res.status(500).json(error.message);
        console.error(error);
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
          _id: user._id,
          username: user.username,
          email: user.email,
          token: generateToken(user._id),
          message: 'User logged in successfully',
        });
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

const testAuth = (req, res) => {
  res.send('Auth is active!');
}

export {registerUser, loginUser, testAuth};
  