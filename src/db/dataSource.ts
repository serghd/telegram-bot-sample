import "reflect-metadata";
import { DataSource } from "typeorm";
import { config } from "../config";
import { Network } from "./entities/Network";
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

export const defaultDataSourceConfig: MysqlConnectionOptions = {
   type: "mysql",
   synchronize: false,
   logging: false,
   migrations: [__dirname + "/migrations/*{.ts,.js}"],
   subscribers: [],
   entities: [Network],
   host: config.database.host,
   port: config.database.port,
   username: config.database.username,
   password: config.database.password,
   database: config.database.name,
};

export const AppDataSource = new DataSource(defaultDataSourceConfig);
