require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { dbConnection } = require("./config/db");
const router = require("./routes");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("tiny"));

app.use(
  cors({
    origin: `${process.env.STUDIO_M_CLIENT_HOST}`,
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use("/api", router);

dbConnection();

app.listen(process.env.PORT, () =>
  console.log(`listening on port ${process.env.PORT}`)
);
