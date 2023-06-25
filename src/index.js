import { App } from "./app.js";
import dotenv from "dotenv";
dotenv.config();

new App(process.env.PORT || 3005).start();

