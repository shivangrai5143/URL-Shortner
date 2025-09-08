const mongoose = require("mongoose");

// Function to establish a connection to MongoDB
async function connectToMongoDB(url) {
  try {
    await mongoose.connect(url);
    console.log("MongoDB connected successfully!");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err; // Re-throw the error to handle it in the calling function
  }
}

module.exports = {
  connectToMongoDB,
};
