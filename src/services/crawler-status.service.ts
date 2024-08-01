import { DataSource, DeepPartial } from "typeorm";
import { CrawlerStatusEntity } from "../entities/crawler-status.entity";
import { BaseService } from "./base.service";

export class CrawlerStatusService extends BaseService<CrawlerStatusEntity>{
   private readonly database: DataSource;
   constructor(database: DataSource) {
      super(database, CrawlerStatusEntity);
      this.database = database;
   }

   public async getCrawlerStatus(crawlerType : string): Promise<DeepPartial<CrawlerStatusEntity>> {
      try {
         const lastCrawlerStatus: CrawlerStatusEntity = (await this.database
            .getRepository(CrawlerStatusEntity)
            .findOne({
               where: {contractName : crawlerType} as any,
            })) as CrawlerStatusEntity;
         return lastCrawlerStatus;
      } catch (error) {
         throw error;
      }
   }

   // public async createCrawlerStatus(
   //    crawlerStatus: DeepPartial<CrawlerStatusEntity>
   // ): Promise<any> {
   //    try {
   //       return await this.database
   //          .getRepository(CrawlerStatusEntity)
   //          .save(crawlerStatus);
   //    } catch (error) {
   //       throw error;
   //    }
   // }

   public async updateCrawlerStatus(
      crawlerStatus: DeepPartial<CrawlerStatusEntity>,
      crawlerType : string
   ): Promise<any> {
      try {
         const lastCrawlerStatus: CrawlerStatusEntity = (await this.database
            .getRepository(CrawlerStatusEntity)
            .findOne({
               where: {contractName : crawlerType},
            })) as CrawlerStatusEntity;

         Object.assign(lastCrawlerStatus, crawlerStatus);
         await this.database
            .getRepository(CrawlerStatusEntity)
            .save(lastCrawlerStatus);
         return crawlerStatus;
      } catch (error) {
         throw error;
      }
   }

}
