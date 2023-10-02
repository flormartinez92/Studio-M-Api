const moongose = require("mongoose");

const dbConnection = async () => {
  try {
    return await moongose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    });
  } catch (error) {
    console.error("Failed to connect to database", error);
  }
};

moongose.connection.on("connected", () => {
  console.log("Connected to database");
});

module.exports = { dbConnection };
