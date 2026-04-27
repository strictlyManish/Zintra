const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (!process.env.MONGOOSE_URI) {
      throw new Error("MONGOOSE_URI is not defined in environment variables");
    }

    const conn = await mongoose.connect(process.env.MONGOOSE_URI, {
      autoIndex: false,
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`MongoDB connected: ${conn.connection.host} ✅`);
  } catch (error) {
    console.error("MongoDB connection error ❌:", error.message);

    process.exit(1);
  }
};

module.exports = connectDB;