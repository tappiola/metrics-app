import * as process from "process";

export enum Uri {
  Login = "/login",
  Reports = "/",
}

export const API_URL = process.env.API_URL || "http://localhost:3001";
