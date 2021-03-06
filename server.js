require("dotenv").config();
const express = require("express");

const app = express();
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));
app.use(express.json());

const subscribersRouter = require("./routes/subscribers");
const users = require("./routes/users");
const auth = require("./routes/auth");
const doctor = require("./routes/doctor");

app.use("/subscribers", subscribersRouter);
app.use("/user", users);
app.use("/auth", auth);
app.use("/doctor", doctor);

app.listen(3000, () => console.log("Server Started"));
