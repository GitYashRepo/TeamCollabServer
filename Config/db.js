const mongoose = require("mongoose");

let isConnected = false;
const connectToDb = async () => {
    if (isConnected) {
        return;
      }
  try {
    const db = await mongoose.connect(process.env.DB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("✅ MongoDB connected successfully.");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
  }
};

module.exports = connectToDb;
