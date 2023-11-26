const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const register = async ({ name, username, email, password }) => {
  const userExists = await User.findOne({ $or: [{ username }, { email }] });

  if (userExists) {
    throw 'Username or email already exists';
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    username,
    email,
    password: hashedPassword,
  });

  await user.save();

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
      email: user.email,
      name: user.name,
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  return {
    data: {
      user,
      token,
    },
    message: 'User registered',
  };
};

const login = async (req) => {
  console.log('login function called');
  const authHeader = req.headers.authorization;
  const { username, email, password } = req.body;

  if (authHeader) {
    const token = authHeader.split(' ')[1];
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded);
        const user = await User.findById(decoded.id);
        // console.log(user);
        if (!user) {
          console.log('user not found');
          throw 'User not found';
        }
  
        return {
          data: {
            user,
            token,
          },
          message: 'User logged in',
        };
      } catch (err) {
          if (err.name === 'TokenExpiredError') {
            const decoded = jwt.decode(token);
            const user = await User.findById(decoded.id);
    
            if (!user || user.username !== username || !await bcrypt.compare(password, user.password)) {
              throw 'Invalid username or password';
            }
    
            const newToken = jwt.sign({ id: user._id, name: user.name, username: user.username, email: user.email,}, process.env.JWT_SECRET, { expiresIn: '1h' });
    
            return {
              data: {
                user,
                newToken,
              },
              message: 'User logged in',
            };
          }
    
          throw 'Invalid token';
        }
      } 
  else if ((username || email) && password) {
      const user = await User.findOne({ $or: [{ username }, { email }] });
  
      if (!user || !await bcrypt.compare(password, user.password)) {
        throw 'Invalid username/email or password';
      }
  
      const newToken = jwt.sign({ id: user._id, name: user.name, username: user.username, email: user.email,}, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      return {
        data: {
          user,
          tokegtn: newToken,
        },
        message: 'User logged in',
    };
  }
};

  module.exports = {
    register,
    login,
  };