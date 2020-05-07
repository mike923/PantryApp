require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors")
// const admin = require("firebase-admin")

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const receiptsRouter = require("./routes/receipts");
const authRouter = require("./routes/auth");

// const serviceAccount = require("./config/fbServiceAccountKey.json");
const app = express();

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://capstone-pantry.firebaseio.com"
// });

// const checkAuth = (req, res, next) => {
//   if (req.headers.authtoken) {
//     admin.auth().verifyIdToken(req.headers.authtoken)
//       .then((eto) => {
//         console.log(eto)
//         next()
//       }).catch(() => {
//         res.status(403).send('Unauthorized')
//       });
//   } else {
//     res.status(403).send('Unauthorized!')
//     return
//   }
// }


app.use(cors())
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const {checkAuth} = require('./auth/firebase')
// app.use('/', checkAuth)
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/receipts", receiptsRouter);
app.use("/auth", authRouter);

module.exports = app;
