const scrap = require("./scrap.js");
const db = require("./db.js");
const mongoose = require("mongoose");


async function main() {
  const playersData = await scrap.scrapePlayerNames();
  console.log(playersData)
  
  try {
    for (const playerData of playersData) {
      await db.Player.updateOne(
        { playerId: playerData.playerId},
        { $set: playerData },
        { upsert: true }
      );
    }
    console.log("Data inserted into MongoDB");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    mongoose.disconnect();
  }
}

main()