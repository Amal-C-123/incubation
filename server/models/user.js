const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  timeStamp: Date
});
const User = mongoose.model("users", userSchema);

const applicationSchema = new mongoose.Schema({
  userId: mongoose.ObjectId,
  fname: String,
  lname: String,
  email: String,
  streetAddress: String,
  city: String,
  pin: Number,
  companyName: String,
  state: String,
  a: String,
  b: String,
  c: String,
  incubationType: String,
  Status: String,
  View: Boolean,
  Date: Date,
})
const Application = mongoose.model('applications', applicationSchema)

const slotSchema = new mongoose.Schema({
  slotNo: { type: Number, required: true },
  name: { type: String, required: true }, 
  ApplicantId: { type: String, required: true },
  companyId: { type: String, required: true }, 
});

const Slot = mongoose.model("slots", slotSchema);


module.exports = {User, Application, Slot}
