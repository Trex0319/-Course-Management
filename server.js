const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(express.json());

// instruction: setup cors
const corsHandler = cors({
  origin: "*",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
  preflightContinue: true,
});

app.use(corsHandler);

// instruction: setup MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/course")
  .then(() => console.log("MongoDBConnected... "))
  .catch((err) => console.log(err));

// instruction: setup routes
const courseRouter = require("./routes/courses");
const instructorRouter = require("./routes/instructors");

app.use("/courses", courseRouter);
app.use("/instructors", instructorRouter);

app.get("/", (req, res) => {
  res.send("Good luck!");
});

// Server listening
app.listen(port, () => console.log(`Server started on port ${port}`));
