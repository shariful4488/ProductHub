import mongoose from "mongoose";

export const mongoConnect = async () => {
  try {
    if (mongoose.connection.readyState === 1) return;
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(" MongoDB Connected Successfully");
  } catch (error) {
    console.error(" MongoDB Connection Failed:", error.message);
  }
};

export default mongoConnect;