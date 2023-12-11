const mongoose = require("mongoose");
const Poll = require("../models/poll.model");
const User = require("../models/user.model");

const pollService = {
  addNewPoll: async (userId, data) => {
    const numberOfOptions = data.options.length;
    let votes = [];
    for (let number = 0; number < numberOfOptions; number++) {
      votes.push([]);
    }

    try {
      const newPoll = new Poll({
        creatorId: userId,
        question: data.questions,
        options: data.options,
        votes: votes,
      });

      await newPoll.save();

      const creator = await User.findById(userId);
      creator.myPolls.push(newPoll._id);
      await creator.save();

      return {
        data: newPoll,
        message: "New Poll Added",
      };
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },

  addVote: async (userId, data) => {
    try {
      const pollFound = await Poll.findById(data.pollId);

      pollFound.votes[data.option].push(userId);
      await pollFound.save();

      return {
        data: pollFound,
        message: "Vote Added",
      };
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },
};

module.exports = pollService;
