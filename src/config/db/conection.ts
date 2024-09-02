import mongoose from "mongoose";

interface Options {
  mongoUrl: string;
  dbName: string;
}

export class MongoDatabase {
  static async connect(options: Options) {
    const { mongoUrl, dbName } = options;

    console.log("entro aca", dbName, mongoUrl);

    try {
      await mongoose.connect(mongoUrl, {
        dbName,
      });
      console.log("Mongo conectado");
      return true;
    } catch (error) {
      console.log("Error connecting to MongoDB", error);
      throw error;
    }
  }
}
