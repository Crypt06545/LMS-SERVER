import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URL}/LMS`
    );
    console.log(
      `MongoDB connection SuccessFull ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MongoDB connection Failed", error);
    process.exit(1);
  }
};

export default connectDB;
