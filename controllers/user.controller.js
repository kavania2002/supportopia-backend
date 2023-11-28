const userService = require('../services/user.service');

const UserController = {
  register: async (req, res) => {
    try {
      console.log(req.body);
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
      console.log(req.params.id);
      // const id = req.params.id;
      await userService.image(req, res);
      // res.json(result);
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: err.message });
    }
  },
};

module.exports = UserController;