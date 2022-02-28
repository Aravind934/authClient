require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { db } = require("./db");
const cookieParser = require("cookie-parser");

const app = express();

//middlewares

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);
app.use(cookieParser());

//routes
const authRoute = require("./routes/auth");
const profileRoute = require("./routes/profile");
app.use("/user/auth", authRoute);
app.use("/user", profileRoute);

const PORT = process.env.PORT || 8000;

//listen
app.listen(PORT, () => console.log(`App running in port ${process.env.PORT}`));
// db.sync({ force: true });
db.authenticate({})
  .then(() => console.log(`DB connected!`))
  .catch((err) => console.log(err.message));
