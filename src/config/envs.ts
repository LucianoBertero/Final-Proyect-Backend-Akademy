import "dotenv/config";
import { get } from "env-var";

export const envs = {
  PORT: get("PORT").required().asPortNumber(),
  MONGO_URL: get("MONGO_URL").required().asString(),
  MONGO_DB_NAME: get("MONGO_DB").required().asString(),
  JWT_SECRET: get("JWT_SECRET").required().asString(),
  REDIS_URL: get("REDIS_URL").required().asString(),
};
