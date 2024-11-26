import mongoose from "mongoose";

const ConnectionFunction = async () => {
  try {
    const connectionQ = await mongoose.connect(process.env.MONGODB_URL);
    console.log(
      "Connected to MongoDB! with port Number :- ",
      connectionQ.connection.host
    );
  } catch (error) {
    console.log("Error :- ", error);
    process.exit(1);
  }
};

export default ConnectionFunction;
