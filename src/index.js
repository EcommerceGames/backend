const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const app = express();
const PORT = process.env.PORT || 3001;

//Config env
dotenv.config();

//Connect Database
connectDB();

app.listen(PORT, () => {
  console.log(`EcommerceGames listening on port ${PORT}`);
});
