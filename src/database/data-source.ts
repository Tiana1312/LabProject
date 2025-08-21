import "dotenv/config"
import "reflect-metadata";
import { DataSource } from "typeorm";
import { db, env }  from "@/config/config";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: db.host,
    port: db.port,
    username: db.username,
    password: db.password,
    database: db.database,
    synchronize: false,
    logging: false,
    migrationsRun: false,
    entities: env.isProd
        ? ['dist/entities/*.js']
        : ['src/entities/*.ts'],
    migrations: env.isProd
        ? ['dist/database/migrations/*.js']
        : ['src/database/migrations/*.ts'],
}); 
