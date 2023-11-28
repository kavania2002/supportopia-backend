const TestService = require('../services/test.service')

const TestController = {
  getValues: async (req, res) => {
    try {
      const result = await TestService.getValues()
      res.json({ data: result, message: 'Values Received' })
    } catch (error) {
      console.error(error)
      res.status(400).json({ message: error })
    }
  },

  addValues: async (req, res) => {
    try {
      const result = await TestService.addValue(req.body)
      res.json({data: result, message: "Value Added"})
    } catch (error) {
      console.error(error)  
      res.status(400).json({message: error})
    }
  }
}

module.exports = TestController
