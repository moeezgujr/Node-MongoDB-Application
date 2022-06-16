const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  // First Validate The HTTP Request
  if (!req.body.email) {
    return res.status(400).send("Email is missing");
  }
  if (!req.body.password) {
    return res.status(400).send("password is missing");
  }

  //  Now find the user by their email address
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Incorrect email or password.");
  }

  // Then validate the Credentials in MongoDB match
  // those provided in the request
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send("Incorrect email or password.");
  }

  const token = jwt.sign({ _id: user._id }, "PrivateKey");
  res.send(token);
});

// function validate(req) {
//     const schema = {
//         email: Joi.string().min(5).max(255).required().email(),
//         password: Joi.string().min(5).max(255).required()
//     };

//     return Joi.validate(req, schema);
// }

module.exports = router;
