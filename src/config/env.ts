import * as dotenv from 'dotenv';
dotenv.config();

const env = {
    isProd: process.env.NODE_ENV === "production",
    chiefTechnologistFirstName: process.env.CHIEF_TECHNOLOGIST_FIRST_NAME || "Abimbola",
    chiefTechnologistLastName: process.env.CHIEF_TECHNOLOGIST_LAST_NAME || "Odeyemi",
    chiefTechnologistEmail: process.env.CHIEF_TECHNOLOGIST_EMAIL || "abimbolaso@lab.com",
}

export default env;