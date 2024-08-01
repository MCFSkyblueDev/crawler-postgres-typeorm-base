import { CollectionEntity } from "../entities/collection.entity";
import { NftEntity } from "../entities/nft.entity";
import { DataSource } from "typeorm";

class Databases {
   // static async getLastRecord({ url }: any, database: DataSource) {
   //    const lastRecord = await database
   //       .getRepository(RecordEntity)
   //       .findOne({ where: { url: url } });
   //    return (
   //       lastRecord || {
   //          fromBlock: 77000,
   //          toBlock: 77000,
   //          blockNumbers: 0,
   //       }
   //    );
   // }

   // static async saveRecord(data: any, database: DataSource) {
   //    return await database.getRepository(RecordEntity).create(data);
   // }

   static async eraseData(database: DataSource) {
      await database.getRepository(CollectionEntity).clear();
      await database.getRepository(NftEntity).clear();
      // await database.getRepository(UsersEntity).clear();
   }

   static async saveNft(data: NftEntity, database: DataSource) {
      const foundNFT = await database
         .getRepository(NftEntity)
         .findOne({ where: { tokenId: data.tokenId } });
      if (foundNFT)
         return await database
            .getRepository(NftEntity)
            .update({ tokenId: data.tokenId }, { listing: true });
      return await database.getRepository(NftEntity).create(data);
   }

   // static async changeNFTOwner({ tokenId, owner }: any, database: DataSource) {
   //    return await database.getRepository(NftEntity).update(
   //       {
   //          tokenId: tokenId,
   //       },
   //       {
   //          user: owner,
   //       }
   //    );
   // }

   static async changeNFTStatus(
      { tokenId, listing }: any,
      database: DataSource
   ) {
      return await database.getRepository(NftEntity).update(
         {
            tokenId: tokenId,
         },
         {
            listing: listing,
         }
      );
   }

   static async changeNFTPrice({ tokenId, price }: any, database: DataSource) {
      return await database.getRepository(NftEntity).update(
         {
            tokenId: tokenId,
         },
         {
            price: price,
         }
      );
   }

   static async listingNFT({ tokenId, price }: any, database: DataSource) {
      return await database.getRepository(NftEntity).update(
         {
            tokenId: tokenId,
         },
         {
            price: price,
            listing: true,
         }
      );
   }

   static async saveCollection(data: any, database: DataSource) {
      const foundCollection = await database
         .getRepository(CollectionEntity)
         .findOne({
            where: {
               address: data.address,
            },
         });
      if (foundCollection) return foundCollection;
      return await database.getRepository(CollectionEntity).create(data);
   }

   static async getCollection({ address }:any, database: DataSource) {
      return await database
      .getRepository(CollectionEntity).findOne({where : { address: address }});
   }

   // static async saveOwner(data:any, database: DataSource) {
   //    const foundOwner = await database.getRepository(UsersEntity).findOne({where : { address: data.address }});
   //    if (foundOwner) return foundOwner;
   //    return await database.getRepository(UsersEntity).create(data);
   // }
}

export default Databases;
