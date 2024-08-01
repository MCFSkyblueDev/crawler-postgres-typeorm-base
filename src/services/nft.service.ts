import { NftEntity } from "../entities/nft.entity";
import { DataSource, DeepPartial } from "typeorm";

export class NftService {
   private readonly database: DataSource;
   constructor(database: DataSource) {
      this.database = database;
   }

   public async createNft(nft: DeepPartial<NftEntity>): Promise<any> {
      try {
         await this.database.getRepository(NftEntity).save(nft);
         return nft;
      } catch (error) {
         throw error;
      }
   }
}
