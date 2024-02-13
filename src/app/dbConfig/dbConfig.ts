import mongoose from "mongoose";
let connection = false;

const connect = () => {
  if (connection) {
    return;
  } else {
    const dbConnection = mongoose.connect(process.env.MONGO_URL!);

    mongoose.connection.on("connected", () => {
      console.log("Mongodb connected successfully");
      connection = true;
    });

    mongoose.connection.on("error", (err) => {
      console.error(`MongoDB connection error: ${err}`);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("Mongodb is disconnected");
      connection = false;
      process.exit(1);
    });
  }
};

export default connect;
