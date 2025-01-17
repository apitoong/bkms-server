require("dotenv").config();
// require('./config/mongoDB')
const express = require("express");
const session = require("express-session");
const cors = require("cors");
var jwtDecode = require("jwt-decode");
var path = require("path");
const router = require("./router");
const app = express();
const port = process.env.port;
const uploadWeb = require("./multer.js");
var cookieParser = require("cookie-parser");
var MemcachedStore = require("connect-memcached")(session);
// const bodyParser = require('body-parser')
// app.use(bodyParser.urlencoded({
//   extended: true
// }))
// app.use(bodyParser.json())

app.use(cookieParser());
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.sessionSecret,
    cookie: {
      maxAge: 7200000
    },
    httpOnly: false

  })
);

app.use(express.static("./")); // serve all files in root folder, such as index.html
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());
app.use(cors());
app.use("/upload/", uploadWeb);
app.use("/", router);

// app.get('/tes', function (req, res) {
//     res.sendFile(path.join(__dirname + '/sanbox.html'));
// });

console.log(` live on port ${port}  ************'''`);
app.listen(port);
// module.exports = app