const express = require("express");
const router = express.Router();
const Doctors = require("../models/doctors");

// Getting all
// router.get("/", async (req, res) => {
//   res.send("res.subscriber");
// });

// Getting One
// router.get("/:id", getSubscriber, (req, res) => {
//   res.json(res.subscriber);
// });

// // Creating one
//GET Search
router.get("/", async (req, res) => {
  // console.log(req.query.name);
  const filters = req.query;
  let datafilter;
  const city = req.query.city;
  Doctors.find().then((data) => {
    // console.log(data);
    // return res.status(201).json({
    //   message: "success",
    //   data: data,
    // });
    const filteredUsers = data.filter((user) => {
      let isValid = true;
      for (key in filters) {
        console.log(key, user[key], filters[key]);
        isValid = isValid && user[key] == filters[key];
      }
      return isValid;
    });
    res.send(filteredUsers);
  });
  // .catch(err=> {
  //     res.status(406)
  //     return next(err);
  // })
});
router.post("/", async (req, res) => {
  const doctor = new Doctors({
    name: req.body.name,
    country: req.body.country,
    type: req.body.type,
    qualification: req.body.qualification,
    ratings: req.body.ratings,
    city: req.body.city,
  });
  try {
    const newDoc = await doctor.save();
    res.status(201).json(newDoc);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/list', async (req, res) => {

  const users = await Doctors.find({});
  
  const userMap = {};
  users.forEach((user) => {
      userMap[user._id] = user;
  });
  
  res.send(userMap);
  
  });

module.exports = router;
