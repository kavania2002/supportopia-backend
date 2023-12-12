const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { upload } = require("../utils/s3.utils");
const jwtSevices = require("../utils/jwt.utils");

const register = async ({ name, username, email, password }) => {
  const userExists = await User.findOne({ $or: [{ username }, { email }] });
  // console.log("userExists", userExists);

  if (userExists) {
    throw "Username or email already exists";
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
    { expiresIn: "30d" }
  );

  return {
    data: {
      user,
      token,
    },
    message: "User registered",
  };
};

const login = async (req) => {
  const authHeader = req.headers.authorization;
  const { username, email, password } = req.body;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log(decoded);
      const user = await User.findById(decoded.id);
      // console.log(user);
      if (!user) {
        console.log("user not found");
        throw "User not found";
      }
      req.user = user;

      return {
        data: {
          user,
          token,
        },
        message: "User logged in",
      };
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        const decoded = jwt.decode(token);
        const user = await User.findById(decoded.id);

        if (
          !user ||
          user.username !== username ||
          !(await bcrypt.compare(password, user.password))
        ) {
          throw "Invalid username or password";
        }

        const newToken = jwt.sign(
          {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
          },
          process.env.JWT_SECRET,
          { expiresIn: "30d" }
        );
        req.user = user;
        return {
          data: {
            user,
            newToken,
          },
          message: "User logged in",
        };
      }

      throw "Invalid token";
    }
  } else if ((username || email) && password) {
    const user = await User.findOne({ $or: [{ username }, { email }] });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      console.log("Invalid username/email or password");
      throw "Invalid username/email or password";
    }

    const newToken = jwt.sign(
      {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
    // console.log(newToken);
    console.log("New Token Generated");
    return {
      data: {
        user,
        tokegtn: newToken,
      },
      message: "User logged in",
    };
  }
};

const image = async (req, res) => {
  console.log("image function called");
  const userId = req.user.id;
  // console.log(userId);
  upload.single("image")(req, res, async (err) => {
    if (err) {
      console.log(err);
      return res
        .status(400)
        .json({ message: err, error: "Image upload failed." });
    }

    const image_url = req.file.location;
    // console.log(req);
    // console.log(image_url);
    // console.log(userId);

    try {
      const result = await User.findByIdAndUpdate(userId, {
        imageUrl: image_url,
      });
      // console.log(result);
      if (result) {
        return res.json({ message: "Image uploaded successfully." });
      } else {
        return res.status(500).json({ message: "Image upload failed." });
      }
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  });
};

const creatorsTop = async (req, res) => {
  try {
    const result = await User.find({});

    const DataofTop10 = result
      .sort((a, b) => b.supporters.length - a.supporters.length)
      .slice(0, 10);

    return {
      data: DataofTop10,
      message: "Top 10 creators",
    };
  } catch (err) {
    throw err;
  }
};

const getLimitedUserDetails = async (user) => {
  return ({ username, price, description, socials } = user);
};

const getUser = async (req) => {
  try {
    const nameParams = req.params.username;
    const user = await User.findOne({ username: nameParams })
      .populate({
        path: "myPolls",
      })
      .populate({
        path: "myPosts",
        populate: {
          path: "comments",
          populate: {
            path: "commentedBy",
            select: "username name email description",
          },
        },
      })
      .populate({
        path: "mySupports",
        populate: {
          path: "supportedBy",
          select: "name description imageUrl username",
        },
      });

    if (!user) {
      throw new Error("User not found");
    }

    let isMember = false;

    const authHeader = req.headers.authorization;
    // console.log(authHeader);
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      // console.log("printing from auth.middleware", token);
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        // console.log(decoded);
        const userId = req.user.id;
        if (user._id == req.user.id) {
          isMember = true;
        }
        user.supporters.forEach((supporter) => {
          if (supporter.userId._id == req.user.id) {
            isMember = true;
          }
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      console.error("Authorization header is missing");
    }

    // Extracting relevant fields from the user object
    const {
      id,
      name,
      username,
      price,
      description,
      socials,
      myPolls,
      myPosts,
      mySupports,
      supporters,
    } = user;

    // Extracting the number of supporters
    const numberOfSupporters = supporters.length;

    // Extracting only the recent 5 supports
    const latestFiveSupports = mySupports.slice(-5);
    const recentSupports = latestFiveSupports.reverse();

    // Creating the response object
    const response = {
      data: {
        id,
        name,
        username,
        membershipPrice: price,
        description,
        socials,
        polls: isMember ? myPolls : [],
        posts: isMember ? myPosts : [],
        numberOfSupporters,
        supports: recentSupports,
      },
      message: "User found",
    };

    return response;
  } catch (error) {
    // Handle errors here
    console.error(`Error in getUser: ${error.message}`);
    throw error; // Re-throw the error for the calling code to handle if needed
  }
};

const name = async (req, res) => {
  const userId = req.user.id;
  // console.log(userId);
  const { name } = req.body;
  // console.log(name);
  try {
    const result = await User.findByIdAndUpdate(userId, { name: name });
    // console.log(result);
    if (result) {
      return res.json({ message: "Name updated successfully." });
    } else {
      return res.status(500).json({ message: "Name update failed." });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const description = async (req, res) => {
  // console.log('description function called');
  const userId = req.user.id;
  // console.log(userId);
  const { description } = req.body;
  // console.log(description);
  try {
    const result = await User.findByIdAndUpdate(userId, {
      description: description,
    });
    console.log(result);
    if (result) {
      return res.json({ message: "Description updated successfully." });
    } else {
      return res.status(500).json({ message: "Description update failed." });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const updateProfile = async (req, res) => {
  const userId = req.user.id;

  upload.single("image")(req, res, async (err) => {
    if (err) {
      console.error(err);
      return {
        message: err,
        error: "Image Upload Failed",
      };
    }

    const image_url = req.file.location;
    const { name, description, socials, price } = req.body;
    console.log(image_url);

    try {
      const result = await User.findByIdAndUpdate(userId, {
        name: name,
        description: description,
        price: price,
        socials: JSON.parse(socials),
        imageUrl: image_url,
      });
      if (result) {
        return res.json({
          message: "Profile Updated",
        });
      } else {
        return res.status(500).json({
          message: "Error Updating Profile",
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Internal Server error",
        error: error.message,
      });
    }
  });
};

const creatorStats = async (userId) => {
  try {
    const creator = await User.findById(userId)
      .populate({
        path: "supporters",
        populate: {
          path: "userId",
          select: "_id name username email description imageUrl socials",
        },
      })
      .populate({ path: "mySupports", select: "price number" });

    let creatorInfo = {
      name: creator.name,
      username: creator.username,
      description: creator.description,
      imageUrl: creator.imageUrl,
      price: creator.price,
      socials: creator.socials,
      supporters: creator.supporters,
      numberOfCoffee: creator.mySupports.length,
      totalMembers: creator.supporters.length,
    };

    let totalRevenue = 0;
    for (let i = 0; i < creator.mySupports.length; i++) {
      totalRevenue +=
        creator.mySupports[i].price * creator.mySupports[i].number;
    }

    creatorInfo = { ...creatorInfo, totalRevenue: totalRevenue };

    return {
      data: creatorInfo,
      message: "Creator Stats Fetched",
    };
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

module.exports = {
  register,
  login,
  image,
  creatorsTop,
  name,
  description,
  getUser,
  updateProfile,
  creatorStats,
};
