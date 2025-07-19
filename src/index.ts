import 'module-alias/register';
import express from "express";
import router from "@/routes";
import dotenv from 'dotenv';

dotenv.config();

const app = express() 

app.use(express.json())
app.use("/", router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})