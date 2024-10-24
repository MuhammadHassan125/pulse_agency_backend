import mongoose from "mongoose";
import { logger } from "../services/utils/logger.js";
import { MONGO_DB_URI } from "../../src/config/configurations.js";

export const connectDb = async () => {
  // CONNECT TO MONGO DB
  mongoose.connect(MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  // CHECK CONNECTION
  mongoose.connection
    .on("open", () => {
      console.log(...`DB CONNECTION SUCCESSFUL`);
      logger.info("DB CONNECTION SUCCESSFUL");
    })
    .on("close", () => {
      console.log("DB CONNECTION CLOSED");
      logger.info("DB CONNECTION CLOSED");
    })
    .on("error", (error) => {
      console.log(`ERROR IN CONNECTING DB:\n ${error}`);
      logger.error(`ERROR IN CONNECTING DB:\n ${error}`);
    });
};
