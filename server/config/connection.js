const mongoose = require("mongoose");

module.exports.connectDB = async () => {
  mongoose
    .connect(
      process.env.DB_CONN,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => console.log("db connected"))
    .catch((err) => console.error("Not connected", err.message));
};
