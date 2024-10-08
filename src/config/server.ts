import swaggerUI from "swagger-ui-express";
import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { envs } from "./envs";
import morgan from "morgan";
import { MongoDatabase } from "./db/conection";
import userRoutes from "../routes/user.routes";
import authRoutes from "../routes/auth.routes";
import assetRoutes from "../routes/assets.routes";
import categoriesRoutes from "../routes/categories.routes";
import employeeRoutes from "../routes/employee.routes";
import roleRoutes from "../routes/role.routes";
import specs from "./swagger/swagger";

dotenv.config();

class Server {
  private app: Application;
  private port: number;
  private apiPaths = {
    auth: "/auth",
    users: "/user",
    asset: "/asset",
    categories: "/categories",
    employee: "/employee",
    roles: "/roles",
  };

  constructor() {
    this.app = express();
    this.port = envs.PORT || 3000;
    this.dbConection();
    this.middlewares();
    this.routes();
  }

  async dbConection() {
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
    this.app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
  }

  routes() {
    this.app.use(this.apiPaths.auth, authRoutes);
    this.app.use(this.apiPaths.asset, assetRoutes);
    this.app.use(this.apiPaths.users, userRoutes);
    this.app.use(this.apiPaths.categories, categoriesRoutes);
    this.app.use(this.apiPaths.employee, employeeRoutes);
    this.app.use(this.apiPaths.roles, roleRoutes);
  }
}

export default Server;
