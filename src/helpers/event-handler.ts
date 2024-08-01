import { DataSource } from "typeorm";
import { DataDecoder } from "./data-decoder";
// import Databases from "../services/database.service";
import axios from "axios";
import { TokenboundService } from "../services/tokenbound.service";
import { TokenboundEntity } from "../entities/tokenbound.entity";
import { TokenboundAccountConnection } from "./tokenbound-account-connection";
// import { TokenboundEntity } from "../entities/tokenbound.entity";

export class EventHandler {
   private readonly database: DataSource;

   constructor(database: DataSource) {
      this.database = database;
   }

   public handleNFTMinted = async (event: any) => {
      const userAddress = event.data[1];
      const tokenId = DataDecoder.feltToInt({
         low: event.data[2],
         high: event.data[3],
      });
      const { data: nftMetadata } = await axios.get(
         `https://grow-api.memeland.com/token/metadata/${tokenId}.json`
      );

      const tokenboundService: TokenboundService = new TokenboundService(
         this.database
      );
      const existTokenboundAccount: TokenboundEntity | null =
         await tokenboundService.getTokenboundEntityByTokenId(tokenId);
      if (!existTokenboundAccount) {
         await tokenboundService.createNewTokenboundEntity({
            tokenId: tokenId,
            walletAddress: userAddress,
            name: nftMetadata.name,
            image: nftMetadata.image,
         });
         return;
      }

      if (
         existTokenboundAccount.name &&
         existTokenboundAccount.walletAddress &&
         existTokenboundAccount.image
      )
         throw new Error("Do not need to update tokenbound");
      existTokenboundAccount.walletAddress = userAddress;
      existTokenboundAccount.name = nftMetadata.name;
      existTokenboundAccount.image = nftMetadata.image;
      await tokenboundService.updateEntityById(
         existTokenboundAccount.id,
         existTokenboundAccount
      );
   };

   public handleRegistryCreateAccount = async (event: any) => {
      const tokenId = DataDecoder.feltToInt({
         low: event.data[1],
         high: event.data[2],
      });
      const tokenContractAddress = event.data[0];

      const tokenboundService: TokenboundService = new TokenboundService(
         this.database
      );

      //? Check tokenbound account exists or not
      const existTokenboundAccount: TokenboundEntity | null =
         await tokenboundService.getTokenboundEntityByTokenId(tokenId);

      const tokenboundAccount: TokenboundAccountConnection =
         await new TokenboundAccountConnection(tokenContractAddress, tokenId);
      const tokenboundAddress: string =
         await tokenboundAccount.getTokenboundAddress();

      if (!existTokenboundAccount) {
         await tokenboundService.createNewTokenboundEntity({
            tokenId: tokenId,
            tokenboundAddress: tokenboundAddress,
         });
         return;
      }

      // if (existTokenboundAccount?.tokenboundAddress) {
      //    throw new Error("Do not need to update tokenbound");
      // }
      existTokenboundAccount.tokenboundAddress = tokenboundAddress;
      return await tokenboundService.updateEntityById(
         existTokenboundAccount.id,
         existTokenboundAccount
      );
   };

   public handleListNft = async (event: any) => {
      const tokenId = DataDecoder.feltToInt({
         low: event.data[1],
         high: event.data[2],
      });
      const price = DataDecoder.feltToInt({
         low: event.data[3],
         high: event.data[4],
      });

      try {
         const tokenboundService: TokenboundService = new TokenboundService(
            this.database
         );
         const existTokenboundAccount: TokenboundEntity | null =
            await tokenboundService.getTokenboundEntityByTokenId(tokenId);
         if (!existTokenboundAccount)
            throw new Error("Cannot find tokenbound entity");
         existTokenboundAccount.price = price / 10 ** 18;
         existTokenboundAccount.listing = true;
         // existTokenboundAccount.name = "Potatoz #2";

         const a = await tokenboundService.updateEntityById(
            existTokenboundAccount.id,
            existTokenboundAccount
         );

         console.log(a);
      } catch (error) {
         throw new Error("Can not update tokenbound entity");
      }
   };

   public handleRemoveNftFromMarket = async (event: any) => {
      const tokenId = DataDecoder.feltToInt({
         low: event.data[1],
         high: event.data[2],
      });

      try {
         const tokenboundService: TokenboundService = new TokenboundService(
            this.database
         );
         const existTokenboundAccount: TokenboundEntity | null =
            await tokenboundService.getTokenboundEntityByTokenId(tokenId);
         if (!existTokenboundAccount)
            throw new Error("Cannot find tokenbound entity");
         existTokenboundAccount.price = 0;
         existTokenboundAccount.listing = false;
         tokenboundService.updateEntityById(
            existTokenboundAccount.id,
            existTokenboundAccount
         );
      } catch (error) {
         throw new Error("Can not update tokenbound entity");
      }
   };

   // static async handleListedEvent(
   //    { event }: any,
   //    database: DataSource
   // ): Promise<any> {
   //    const tokenID = DataDecoder.feltToInt({
   //       low: event.data[2],
   //       high: event.data[3],
   //    });
   //    const price = DataDecoder.feltToInt({
   //       low: event.data[4],
   //       high: event.data[5],
   //    });
   //    await Databases.listingNFT(
   //       {
   //          tokenID,
   //          price,
   //       },
   //       database
   //    );
   // }

   // static async handleCancelEvent({ event }: any): Promise<any> {
   //    const tokenID = DataDecoder.feltToInt({
   //       low: event.data[0],
   //       high: event.data[1],
   //    });
   //    await Databases.changeNFTStatus({
   //       tokenID,
   //       listing: false,
   //    });
   // }

   // static async handleBoughtEvent({ event }: any): Promise<any> {

   // }

   // static async handleEditPriceEvent({ event }: any): Promise<any> {
   //    const tokenID = DataDecoder.feltToInt({
   //       low: event.data[0],
   //       high: event.data[1],
   //    });
   //    const price = DataDecoder.feltToInt({
   //       low: event.data[2],
   //       high: event.data[3],
   //    });
   //    await Databases.changeNFTPrice({
   //       tokenID,
   //       price,
   //    });
   // }

   // static async handleNFTMintedEvent({ event }: any): Promise<any> {
   //    const ownerAddress = event.data[1];
   //    const tokenID = DataDecoder.feltToInt({
   //       low: event.data[2],
   //       high: event.data[3],
   //    });

   //    const owner = await Databases.saveOwner({ address: ownerAddress });
   //    const collection = await Databases.getCollection({
   //       address: process.env.NFT_CONTRACT,
   //    });
   //    const { data: nftMetadata } = await axios.get(
   //       `https://grow-api.memeland.com/token/metadata/${tokenID}.json`
   //    );
   //    await Databases.saveNFT({
   //       tokenID,
   //       name: nftMetadata.name,
   //       owner: owner._id,
   //       NFT_collection: collection._id,
   //       image: nftMetadata.image,
   //    });
   // }
}
