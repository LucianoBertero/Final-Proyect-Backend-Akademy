import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { envs } from "./envs";
import mongoose from "mongoose";
import morgan from "morgan";
import { MongoDatabase } from "./db/conection";
import userRoutes from "../routes/user.routes";
import authRoutes from "../routes/auth.routes";
import assetRoutes from "../routes/assets.routes";

dotenv.config();

class Server {
  private app: Application;
  private port: number;
  private apiPaths = {
    auth: "/auth",
    users: "/user",
    asset: "/asset",
  };

  constructor() {
    this.app = express();
    this.port = envs.PORT || 3000;
    this.dbConection();
    this.middlewares();
    this.routes();
  }

  async dbConection() {
    console.log(envs.MONGO_URL);
    console.log(envs.MONGO_DB_NAME);
    await MongoDatabase.connect({
      dbName: envs.MONGO_DB_NAME,
      mongoUrl: envs.MONGO_URL,
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto" + this.port);
    });
  }
  middlewares() {
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.apiPaths.auth, authRoutes);
    this.app.use(this.apiPaths.asset, assetRoutes);
    this.app.use(this.apiPaths.users, userRoutes);
    // this.app.use(this.apiPaths.employee, employeeRoutes);
    // this.app.use(this.apiPaths.position, positionRoutes);
    // this.app.use(this.apiPaths.recoverPass, recovePass);
  }
}

export default Server;
