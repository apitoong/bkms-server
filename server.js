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

app.use(cookieParser());
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.sessionSecret,
    cookie: { maxAge: 60000 }
  })
);
// app.use(
//   session({
//     secret: process.env.sessionSecret,
//     key: "bkmskey",
//     proxy: "true",
//     store: new MemcachedStore({
//       hosts: [process.env.host], //Memcached server host url
//       secret: "123, ABC" // Optionally use transparent encryption for memcache session data
//     })
//   })
// );

app.use(express.static("./")); // serve all files in root folder, such as index.html
app.use(express.urlencoded({ extended: false }));
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
