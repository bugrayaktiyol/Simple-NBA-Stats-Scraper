const mongoose = require("mongoose");
const {config}= require("dotenv");
const {playerDetailsSchema} = require("./models/playerModel.js");
config();

async function connect() {
  const conn = await 
    mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_COLLECTION}`, 
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    return () => conn.disconnect();
}

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

connect();

const playerSchema = new mongoose.Schema(playerDetailsSchema);

const Player = mongoose.model("Player", playerSchema);

module.exports = {
  Player,
  connect
}