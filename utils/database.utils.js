const mongoose = require("mongoose");

const MONGO_URI = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@cluster0.nip0tn0.mongodb.net/?retryWrites=true&w=majority`;

exports.connect = () => {
  // Connecting to the database
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
};