import * as dotenv from "dotenv";
dotenv.config({path: ".env"})

import db from "./db";
import env from "./env";
import app from "./app";

export default { db, env, app, };
