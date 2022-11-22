var express = require("express");
var router = express.Router();
let adminAuth = require('../config/AuthTokens')
const {adminVerify} = require('./verifyToken')
require("dotenv").config();


const { User, Application, Slot } = require("../models/user");

/* GET users listing. */
router.post("/login", function (req, res, next) {
  const adminCred = {
    email: "admin@123.com",
    password: "123",
  };
  const { password, email } = req.body;
  if (password === adminCred.password && email == adminCred.email) {
    const adminToken = adminAuth.AdminAuthToken()
    return res.status(200).send({ message: "Logged In", adminCred, adminToken});
  } else {
    res.send({ message: "invalid username or password" });
  }
});

router.get("/applications",adminVerify, async (req, res) => {
  const applications = await Application.find().sort({ Date: 1 });
  res.send(applications);
});

router.post("/change-view", async (req, res) => {
  await Application.findOneAndUpdate(
    { _id: req.body.id },
    { View: true },
    { upsert: true }
  );
  res.status(200).send("view status changed");
});

router.post("/set-approve", async (req, res) => {
  await Application.findOneAndUpdate(
    { _id: req.body.id },
    { Status: "approved" },
    { upsert: true }
  );
  res.send("status changed");
});

router.post("/set-decline", async (req, res) => {
  await Application.findOneAndUpdate(
    { _id: req.body.id },
    { Status: "declined" },
    { upsert: true }
  );
  res.send("status changed");
});

router.get("/get-slots",adminVerify, async (req, res) => {
  await Slot.find().then((data) => {
    res.status(200).send(data);
  });
});

router.post("/booked-data", async (req, res) => {
  const { companyId } = req.body;
  await Application.findOne({ _id: companyId }).then((data) => {
    res.send(data);
  });
});

router.get("/approved-companies",adminVerify, async (req, res) => {
  await Application.find({ Status: "approved" }).then((data) => {
    res.send(data);
  });
});

router.post("/set-slot", async (req, res) => {
  const { companyId, slotNo } = req.body;
  let companyDetails = await Application.findOne({ _id: companyId });
  await Slot.findOneAndUpdate(
    { name: slotNo },
    { companyId, name: companyDetails.companyName },
    { upsert: true }
  );
  await Application.findOneAndUpdate(
    { _id: companyId },
    { Status: "allocated" }
  );
  res.send("success");
});

//allocating from approved table
router.post("/setSlot", async (req, res) => {
  let { companyName, userId, _id } = req.body;
  // await Slot.findOneAndUpdate({companyId: ''}, {companyId: _id},
  // {name: companyName}, {ApplicantId: userId}

  await Slot.findOneAndUpdate(
    { companyId: "" },
    {
      $set: {
        companyId: _id,
        name: companyName,
        ApplicantId: userId,
      },
    },
    {
      upsert: true,
    }
  );

  await Application.findOneAndUpdate(
    { _id },
    { Status: "allocated" },
    { upsert: true }
  );
  res.send({ status: "success" });
});

// router.get("/createSlots", async(req, res) => {
//   try {
//     for (let i = 1; i <= 48; i++) {
//        await new Slot({ slotNo: i, name: `RN-${i}`, ApplicantId: '', companyId: ''}).save().then(()=>{
//         console.log('worked');
//       })
//     }
//   } catch (err) {
//     console.log(err.message);
//   }
//   res.send("jkdfjk");
// });

module.exports = router;
