import mongoose from "mongoose";
require("dotenv").config();

(async () => {
  try {
    mongoose.set("strictQuery", true);
    const db = await mongoose.connect(process.env.MONGO_URL);
    console.log("dbb", db.connection.name);
    mongoose.connection.db.listCollections().toArray(function (err, collections) {
      console.log("colecciones", collections);
    }); 
  } catch (error) {
    console.log(error);
  }
})();

 /* git key : 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 */

 