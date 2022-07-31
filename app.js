const express = require("express");
const createErrors = require("http-errors");
const userRoute = require("./routes/user.route");
const categoryRoute = require("./routes/category.route");
const noteRoute = require("./routes/note.route");
const cors = require("cors");

require("dotenv").config();
require("./helpers/mongodb.helper");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);

app.use("/user", userRoute);
app.use("/category", categoryRoute);
app.use("/note", noteRoute);

app.use(async (req, res, next) => {
  next(createErrors.NotFound("This route does not exists!"));
});

app.use((err, req, res, next) => {
  if (err.code === "LIMIT_FILE_SIZE") {
    err.status = 400;
  }
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message || "Internal server error",
    },
  });
});

app.listen(PORT, () => {
  console.log(`server running at port ${PORT}...`);
});
