const moongose = require("mongoose");

// Configuracion DB
const dbConnection = async () => {
  try {
    await moongose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    });
    console.log("Base de datos online");
  } catch (error) {
    console.log(error);
    throw new Error("Error al iniciar la base de datos");
  }
};

module.exports = { dbConnection };
