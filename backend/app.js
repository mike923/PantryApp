require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors")

const { checkAuth } = require("./firebase");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const receiptsRouter = require("./routes/receipts");
const authRouter = require("./routes/auth");
const foodItemRouter = require("./routes/foodItem");
const allFoodsRouter = require("./routes/allFoods")

const app = express();

app.use(cors())
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/allFoods", allFoodsRouter);
app.use("/users", usersRouter);
app.use("/receipts", checkAuth, receiptsRouter);
app.use("/auth", authRouter);
app.use("/fooditem", checkAuth, foodItemRouter);

module.exports = app;
