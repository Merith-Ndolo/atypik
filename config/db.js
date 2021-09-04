const mongoose = require("mongoose");

const conn = function connexion() {
  if (process.env.NODE_ENV === "test") {
    const Mockgoose = require("mockgoose").Mockgoose;
    const mockgoose = new Mockgoose(mongoose);

    mockgoose.prepareStorage().then(() => {
      mongoose
        .connect(process.env.MONGODB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          useFindAndModify: false,
        })
        .then(() => console.log("Connected to MongoDB for test"))
        .catch((err) => console.log("Failed to connect to MongoDB", err));
    });
  } else {
    mongoose
      .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      })
      .then(() => console.log("Connected to MongoDB for dev"))
      .catch((err) => console.log("Failed to connect to MongoDB", err));
  }
};

const close = function disconnect() {
  return mongoose.disconnect();
};

module.exports = { conn, close };
