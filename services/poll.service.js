const mongoose = require("mongoose");
const Poll = require("../models/poll.model");
const User = require("../models/user.model");

const pollService = {
  addNewPoll: async (userId, data) => {
    const numberOfOptions = data.options.length;
    let votes = [];
    let percentage = [];
    for (let number = 0; number < numberOfOptions; number++) {
      votes.push([]);
      percentage.push(0);
    }

    try {
      const newPoll = new Poll({
        creatorId: userId,
        question: data.questions,
        options: data.options,
        votes: votes,
        percentage,
        totalVotes: 0,
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

      pollFound.totalVotes = pollFound.totalVotes + 1;

      let percentage = [];
      pollFound.votes.forEach((voters) => {
        percentage.push(voters.length / pollFound.totalVotes);
      });

      pollFound.percentage = percentage;
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
