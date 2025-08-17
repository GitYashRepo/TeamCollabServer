import mongoose from "mongoose";

const connectToDb = async () => {
  try {
    const db = await mongoose.connect(process.env.DB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully.");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
  }
};

export default connectToDb;
