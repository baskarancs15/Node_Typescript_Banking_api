
import mongoose from "mongoose";
require("dotenv/config");

async function connect() {
      console.log(process.env.MONGO_HOST)
      const dbUri = mongoose.connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DBNAME}`, {});
      try {
        await dbUri;
       console.log("DB connected");
      } catch (error) {
        console.log("DB not connected");
        process.exit(1);
      }
    }

    export default connect;