const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const app = express();
const PORT = process.env.PORT || 3001;
const routes = require("./routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
//Config env
dotenv.config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// CORS
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Routes
routes(app);

//Connect Database
connectDB();

app.listen(PORT, () => {
  console.log(`EcommerceGames listening on port ${PORT}`);
});
