const express = require("express");
const morgan = require("morgan");
const database = require("../config/db");
const csrf = require("csurf");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const userRoutes = require("../routes/userRoutes");
const estatesRoutes = require("../routes/estatesRoutes");
const appRoutes = require("../routes/appRoutes");
const userProfileRoutes = require("../routes/userProfileRoutes");
const apiRoutes = require("../routes/apiRoutes");
const verifyUser = require("../middlewares/verifyUser");

const app = express();

//Database connection

const databaseConection = async () => {
  try {
    await database.authenticate();
    database.sync();
    console.log("Conection successfully to database");
  } catch (error) {
    console.log(error);
  }
};

databaseConection();

//Config
app.set("PORT", process.env.PORT || 3000);
app.set("views", "./views");
app.set("view engine", "pug");
app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(csrf({ cookie: true }));

//Public folder
app.use(express.static("public"));

//Routes
app.use("/", appRoutes);
app.use("/auth", userRoutes);
app.use("/page", estatesRoutes);
app.use("/page/profile", userProfileRoutes);
app.use("/api", apiRoutes);
app.use(verifyUser, function (req, res) {
  const { user } = req;
  res.status(404).render("pages/not-found", {
    page: "Not Found",
    csrfToken: req.csrfToken(),
    user: user
  });
});

module.exports = app;
