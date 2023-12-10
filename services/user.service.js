const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const {upload} = require('../utils/s3.utils');
const jwtSevices = require('../utils/jwt.utils')
const register = async ({ name, username, email, password }) => {
  const userExists = await User.findOne({ $or: [{ username }, { email }] });
  // console.log("userExists", userExists);

  if (userExists) {
    throw 'Username or email already exists';
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    username,
    email,
    password: hashedPassword,
    description: "",
    imageUrl: "",
    price: 0,
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
        req.user = user;
  
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
            req.user = user;
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

      // console.log(user);
      if (!user || !await bcrypt.compare(password, user.password)) {
        console.log('Invalid username/email or password');
        throw 'Invalid username/email or password';
      }
  
      const newToken = jwt.sign({ id: user._id, name: user.name, username: user.username, email: user.email,}, process.env.JWT_SECRET, { expiresIn: '1h' });
      // console.log(newToken);
      console.log("New Token Generated");
      return {
        data: {
          user,
          tokegtn: newToken,
        },
        message: 'User logged in',
    };
  }
};

const image = async (req,res) => {
  console.log('image function called');
  const userId = req.user.id; 
  // console.log(userId);
    upload.single("image")(req, res, async (err) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ message: err, error: "Image upload failed." });
      } 

    const image_url = (req.file.location);
    // console.log(req);
    // console.log(image_url);
    // console.log(userId);

    try {
      const result = await User.findByIdAndUpdate(userId, { imageUrl: image_url });
      // console.log(result);
      if (result) {
        return res.json({ message: 'Image uploaded successfully.' });
      } else {
        return res.status(500).json({ message: 'Image upload failed.' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  })};


  const creatorsTop = async (req, res) => {
    try {
      const result = await User.find({});

      const DataofTop10 = result.sort((a, b) => b.supporters.length - a.supporters.length).slice(0, 10);

      return {
        data : DataofTop10,
        message: 'Top 10 creators'
      };
    } catch (err) {
      throw err;
    }
  };  


module.exports = {register, login, image, creatorsTop, name, description, getUser};