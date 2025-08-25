import "reflect-metadata";
import 'module-alias/register';
import { AppDataSource } from "@/database"
import express from "express";
import router from "@/routes";

const app = express() 

app.use(express.json())

app.use("/api", router);

const PORT = process.env.port || 3000;

AppDataSource.initialize()
.then( () => {
    console.log("Database connection is successful");
})
.catch( (error) => {
    console.error("Database connection failed:", error);
})

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})