import "colors";
// import Router from "koa-router";
import { DataSource, DataSourceOptions } from "typeorm";
import { CrawlerStatusEntity } from "./crawler-status.entity";
import { JobManagerEntity } from "./job-manager.entity";
import { CollectionEntity } from "./collection.entity";
import { NftEntity } from "./nft.entity";
import { TokenboundEntity } from "./tokenbound.entity";
import { Config } from "../config";

const config: Config = new Config();
const dataSourceOptions: DataSourceOptions = {
   type: "postgres",
   host: config.DATABASE_HOST,
   username: config.DATABASE_USER,
   password: config.DATABASE_PASSWORD,
   database: config.DATABASE_NAME,
   synchronize: false,
   logging: false,
   port: config.DATABASE_PORT,
   ssl: {
      rejectUnauthorized: false, // Disables SSL certificate verification
   },
   entities: [
      JobManagerEntity,
      CrawlerStatusEntity,
      CollectionEntity,
      NftEntity,
      TokenboundEntity,
   ],
};

export const connectWithDatabase = async (): Promise<DataSource> => {
   try {
      console.log(
         config.DATABASE_HOST,
         config.DATABASE_USER,
         config.DATABASE_PASSWORD,
         config.DATABASE_NAME,
         config.DATABASE_PORT
      );
      const dataSource: DataSource = new DataSource(dataSourceOptions);
      (await dataSource.initialize())
         .synchronize(false)
         .then(() => {
            console.log("Synchronized data source".green.bold);
         })
         .catch(() => {
            console.log("Failed to sync data source".red.bold);
         });
      return dataSource;
   } catch (error: any) {
      console.error("Error connecting to the database:", error.message);
      throw error; // Rethrow the error to handle it further up the call stack
   }
};
