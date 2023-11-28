const userService = require('../services/user.service');

const UserController = {
  register: async (req, res) => {
    try {
      const result = await userService.register(req.body);
      res.json(result);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  },

  login: async (req, res) => {
    try {
      const result = await userService.login(req);
      res.json(result);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  },

   image: async (req, res) => {
    try {
      await userService.image(req, res);
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: err.message });
    }
  },

  getUser: async (req, res) => {
    try {
      const result = await userService.getUser(req);
      res.json(result);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  },
};

module.exports = UserController;