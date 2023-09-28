const moongose = require("mongoose");

// Configuracion DB
const dbConnection = async () => {
  try {
    return await moongose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    });
  } catch (error) {
    console.error("Failed to connect to database", error);
  }
};

mongoose.connection.on("connected", () => {
  console.log("Connected to database");
});

module.exports = { dbConnection };
