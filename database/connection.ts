import mongoose from "mongoose";

export const connect = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI as string);
  } catch (err) {
    console.log(err);
  }
};
