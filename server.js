const app = require("./app");
const connect = require("./CONFIG/connectionDB.js");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const PORT = process.env.PORT || 3031;

const startDB = async () => {
  await connect();
  app.listen(PORT, console.log(`SERVER RUNNING IN ${PORT} 🏃‍♀️🏃‍♀️`));
};

startDB();
