import * as dotenv from 'dotenv';
dotenv.config();

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