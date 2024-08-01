import { DataSource, DeepPartial } from "typeorm";
import { BaseService } from "./base.service";
import { TokenboundEntity } from "../entities/tokenbound.entity";
import { CollectionEntity } from "../entities/collection.entity";

export class TokenboundService extends BaseService<TokenboundEntity> {
   private readonly database: DataSource;
   constructor(database: DataSource) {
      super(database, TokenboundEntity);
      this.database = database;
   }

   async getTokenboundEntityByTokenId(
      tokenId: number
   ): Promise<TokenboundEntity | null> {
      return await this.database
         .getRepository(TokenboundEntity)
         .findOne({ where: { tokenId: tokenId } });
   }

   async createNewTokenboundEntity(
      entity: DeepPartial<TokenboundEntity>
   ): Promise<TokenboundEntity> {
      try {
         const newTokenboundEntity: TokenboundEntity =
            (await this.createNewEntity(entity)) as TokenboundEntity;
         const collection: CollectionEntity | null = await this.database
            .getRepository(CollectionEntity)
            .findOne({ where: { id: 1 }, relations: ["tokenboundAccounts"] });
         if (!collection) throw new Error("Couldn't find collection");
         console.log("-----------------------------------");
         console.log(collection.tokenboundAccounts);
         if (!collection.tokenboundAccounts) {
            collection.tokenboundAccounts = [];
         }
         collection?.tokenboundAccounts?.push(newTokenboundEntity);
         await this.database.getRepository(CollectionEntity).save(collection);
         return newTokenboundEntity;
      } catch (error) {
         throw error;
      }
   }

   public async updateStatus(
      crawlerStatus: DeepPartial<TokenboundEntity>,
      tokenId: number,
      price: number
   ): Promise<any> {
      try {
         const existTokenboundAccount: TokenboundEntity = (await this.database
            .getRepository(TokenboundEntity)
            .findOne({
               where: { tokenId: tokenId },
            })) as TokenboundEntity;

         existTokenboundAccount.price = price;
         existTokenboundAccount.listing = true;

         Object.assign(existTokenboundAccount, crawlerStatus);
         await this.database
            .getRepository(TokenboundEntity)
            .save(existTokenboundAccount);
         return crawlerStatus;
      } catch (error) {
         throw error;
      }
   }
}
