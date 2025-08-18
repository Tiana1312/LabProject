import "reflect-metadata";
import 'module-alias/register';
import { AppDataSource } from "@/database"
import * as express from "express";
import router from "@/routes";
import config  from "@/config";

AppDataSource.initialize()
.then( () => {
    console.log("Database connection is successful");
})
.catch( (error) => {
    console.error("Database connection failed:", error);
})
const app = express() 

app.use(express.json())
app.use("/", router);

const PORT = config.app.port

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})