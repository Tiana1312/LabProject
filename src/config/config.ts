import * as dotenv from 'dotenv';
dotenv.config();
//dotenv.config({path: ".env"})

// const db = {
//         type: "postgres" as const,
//         host: process.env.DB_HOST || "localhost",
//         port: parseInt(process.env.DB_PORT || "5432"),
//         username: process.env.DB_USERNAME || "",
//         password: process.env.DB_PASSWORD || "",
//         database: process.env.DB_NAME || "", 
// }
    
//const env = {
  //  isProd: process.env.NODE_ENV === "production",
//}

//const app = {
   // port: process.env.PORT || 3000
//}

//export default {
  //  db, env, app
//}

export const app = {
    port: process.env.PORT || 3000,
};

export const db = {
        type: "postgres" as const,
        host: process.env.DB_HOST || "localhost",
        port: parseInt(process.env.DB_PORT || "5432"),
        username: process.env.DB_USERNAME || "",
        password: process.env.DB_PASSWORD || "",
        database: process.env.DB_NAME || "",
};

export const env = {
    isProd: process.env.NODE_ENV === "production",
};

export const staffConfig = {
    chiefTechnologist: {
        firstName: process.env.CHIEF_TECHNOLOGIST_FIRST_NAME,
        lastName: process.env.CHIEF_TECHNOLOGIST_LAST_NAME,
        email: process.env.CHIEF_TECHNOLOGIST_EMAIL,
        password: process.env.CHIEF_TECHNOLOGIST_PASSWORD,
    },
};

export const JWT = {
    secret: process.env.JWT_SECRET as string,
}

export const SECONDS_IN_7_DAYS = 604800
