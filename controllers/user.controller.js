const userService = require("../services/user.service");

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

  name: async (req, res) => {
    try {
      // const id = req.params.id;
      await userService.name(req, res);
      // res.json(result);
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: err.message });
    }
  },
  creatorsTop: async (req, res) => {
    try {
      console.log(req.body);
      const result = await userService.creatorsTop(req, res);
      console.log(result);
      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: err });
    }
  },

  description: async (req, res) => {
    try {
      // const id = req.params.id;
      await userService.description(req, res);
      // res.json(result);
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
  updateProfile: async (req, res) => {
    try {
      await userService.updateProfile(req, res);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error });
    }
  },
  creatorStats: async (req, res) => {
    try {
      const result = await userService.creatorStats(req.user.id);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error });
    }
  },
};

module.exports = UserController;
