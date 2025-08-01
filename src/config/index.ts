import * as dotenv from "dotenv";

dotenv.config({path: ".env"})

const db = {
        type: "postgres" as const,
        host: process.env.DB_HOST || "localhost",
        port: parseInt(process.env.DB_PORT || "5432"),
        username: process.env.DB_USERNAME || "",
        password: process.env.DB_PASSWORD || "",
        database: process.env.DB_NAME || "", 
}
    
const env = {
    isProd: process.env.NODE_ENV === "production",
}

const app = {
    port: process.env.PORT || 3000
}

export default {
    db, env, app
}