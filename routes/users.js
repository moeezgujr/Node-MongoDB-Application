const { User, validate } = require("../models/user");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
// const config = require('config');
router.post("/", async (req, res) => {
  //   First Validate The Request
  //   const { error } = validate(req.body);
  if (!req.body.email) {
    return res.status(400).send("Email is missing");
  }
  if (!req.body.password) {
    return res.status(400).send("password is missing");
  }
  if (!req.body.name) {
    return res.status(400).send("name is missing");
  }
  // Check if this user already exisits
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("That user already exists!");
  } else {
    // Insert the new user if they do not exist yet
    user = new User(_.pick(req.body, ["name", "email", "password"]));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    // res.send(_.pick(user, ["_id", "name", "email"]));
    const token = jwt.sign({ _id: user._id }, "PrivateKey");
    res
      .header("x-auth-token", token)
      .send(_.pick(user, ["_id", "name", "email"]));
  }
});

module.exports = router;
