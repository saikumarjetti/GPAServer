const express = require("express");
// const mongoose = require("mongoose");
const cors = require("cors");

const PORT = 8001;
const app = express();
const helmet = require("helmet");

const loginRouter = require("./src/routes/login");
// let os = require("os");

// let networkInterfaces = os.networkInterfaces();
// let ip = networkInterfaces["en0"];
// ip = ip[0]["family"] === "IPv6" ? ip[1]["address"] : ip[0]["address"];
// console.log(`ip = ${ip}`);
// console.log(os.networkInterfaces());

// mongoose
//   .connect("mongodb://localhost:27017/GPA", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Connected to MongoDB successfully");
//   })
//   .catch((error) => {
//     console.error("Error connecting to MongoDB:", error);
//   });

const allowedOrigins = ["http://localhost:5173"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
helmet({
  crossOriginResourcePolicy: false,
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use("/", loginRouter);

app.listen(PORT, () => {
  console.log(`server listening at port ${PORT}....`);
});
