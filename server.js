const express = require("express");
const cors = require("cors");

const PORT = 8001;
const app = express();
const helmet = require("helmet");
const dataLoader = require("./dataLoader");
const mongoose = require("mongoose");
const loginRouter = require("./src/routes/login");
const imagesRouter = require("./src/routes/images");
const uri =
  "mongodb+srv://vercel:3yDWhqEPSRfHEAnC@gpa.wae5rua.mongodb.net/?retryWrites=true&w=majority";
function LoadFileData() {
  dataLoader.readAllImagesList();
}

const allowedOrigins = ["0.0.0.0/0"];
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

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
app.use("/", imagesRouter);

app.listen(PORT, () => {
  console.log(`server listening at port ${PORT}....`);
  LoadFileData();
});
