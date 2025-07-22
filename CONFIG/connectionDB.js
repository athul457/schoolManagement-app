const mongoose = require("mongoose");

const connect = async () => {
  try {
    const DB = process.env.DATABASE.replace(
      "<db_password>",
      process.env.DATABASE_PASSWORD
    );
    await mongoose.connect(DB);
    console.log("DATABASE CONNECTED SUCCESFULLY 😍😍");
  } catch (err) {
    console.error(`Sorry Can't Connect The Database 😔😔`);
    process.exit(1);
  }
};

module.exports = connect;
