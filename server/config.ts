import path from "path";
import dotenv from "dotenv";

const root = path.join(__dirname, ".env");
dotenv.config({ path: root });

export const IS_PRODUCTION = process.env.NODE_ENV! === "production";
export const PORT = process.env.PORT!;
export const NODE_ENV = process.env.NODE_ENV!;
export const DB_URL = process.env.DB_URL!;
export const CLIENT_URL = process.env.CLIENT_URL!;
export const RECAPTCHA_KEY = process.env.RECAPTCHA_KEY!;
export const SERVER_URL = process.env.SERVER_URL!;
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;
