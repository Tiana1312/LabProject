import "dotenv/config"
import "reflect-metadata";
import { DataSource } from "typeorm";
import config from "@/config";

export const AppDataSource = new DataSource({
    ...config.db,
    synchronize: false,
    logging: false,
    
    migrationsRun: false,
    
    entities: config.env.isProd
        ? ['dist/entities/*.js']
        : ['src/entities/*.ts'],
    migrations: config.env.isProd
        ? ['dist/database/migrations/*.js']
        : ['src/database/migrations/*.ts'],
}); 
