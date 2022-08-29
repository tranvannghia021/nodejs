const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.USER_MONGODB}:${process.env.PASS_MONGODB}${process.env.HOST_MONGODB}/${process.env.DB_MONGODB}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("connect mongo success");
  } catch (error) {
    console.log("connect mongo failed");
  }
}

module.exports = { connect };
