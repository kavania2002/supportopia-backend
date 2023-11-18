const Test = require('../models/test.model')

const TestService = {
  getValues: async () => {
    try {
      const result = await Test.find();
      return result
    } catch (error) {
      throw new Error(error)
    }
  },

  addValue: async (data) => {
    try {
      const newValue = Test({
        value: data.value
      })

      await newValue.save()
      return newValue
    } catch (error) {
      throw new Error(error)
    }
  }
}

module.exports = TestService
