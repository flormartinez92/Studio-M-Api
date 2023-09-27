const moongose = require("mongoose");

// Configuracion DB
const dbConnection = async () => {
  try {
    await moongose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    });
    console.log("online database");
  } catch (error) {
    console.log(error);
    throw new Error("error connecting to the database");
  }
};

module.exports = { dbConnection };
