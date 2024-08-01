import { CrawlerType } from "../enums/crawler.enum";
import { CrawlerStatusEntity } from "../entities/crawler-status.entity";
import { CrawlerStatusService } from "../services/crawler-status.service";
import { DataSource, DeepPartial } from "typeorm";
import { EventHandler } from "./event-handler";
import { MarketEvent, Nft721Event, RegistryEvent } from "../enums/event.enum";
import axios from "axios";
// import { CrawlerConstants } from "../constants/crawler.constant";
import { constants, RpcProvider } from "starknet";

export class CrawlerProcess {
   public static async getBlockNumber() {
      try {
         const body = {
            jsonrpc: "2.0",
            method: "starknet_blockNumber",
            id: 0,
         };
         const { data } = await axios.post(
            "https://starknet-sepolia.public.blastapi.io/rpc/v0_7",
            body
         );
         return data?.result || 0;
      } catch (error) {
         throw error;
      }
   }

   public static setUpFirstBlock = async (
      database: DataSource,
      crawlerType: CrawlerType,
      defaultBlocknumber: number
   ): Promise<number> => {
      const crawlerStatusService: CrawlerStatusService =
         new CrawlerStatusService(database);
      let crawlerStatusEntity: DeepPartial<CrawlerStatusEntity> =
         await crawlerStatusService.getCrawlerStatus(crawlerType);

      if (!crawlerStatusEntity) {
         crawlerStatusEntity = await crawlerStatusService.createNewEntity(
            new CrawlerStatusEntity({
               eventSeq: defaultBlocknumber,
               contractName: crawlerType,
               contractAddress: "",
               blockTimestamp: new Date(Date.now()),
            }) as CrawlerStatusEntity
         );
      }

      return crawlerStatusEntity.eventSeq
         ? crawlerStatusEntity.eventSeq
         : defaultBlocknumber;
   };

   public static updateCrawlerStatus = async (
      blocknumber: number,
      database: DataSource,
      crawlerType: CrawlerType
   ) => {
      const crawlerStatusService: CrawlerStatusService =
         new CrawlerStatusService(database);
      let crawlerStatusEntity: DeepPartial<CrawlerStatusEntity> =
         await crawlerStatusService.getCrawlerStatus(crawlerType);
      crawlerStatusEntity.eventSeq = blocknumber;
      await crawlerStatusService.updateCrawlerStatus(
         crawlerStatusEntity,
         crawlerType
      );
   };

   public static handleRegistryEvents = async (
      event: any,
      dataSource: DataSource
   ) => {
      const eventHandler: EventHandler = new EventHandler(dataSource);
      switch (event.keys[0]) {
         case RegistryEvent.ACCOUNT_CREATED:
            {
               await eventHandler.handleRegistryCreateAccount(event);
            }
            break;
      }
   };

   public static handleNftTokenboundEvents = async (
      event: any,
      dataSource: DataSource
   ) => {
      const eventHandler: EventHandler = new EventHandler(dataSource);

      switch (event.keys[0]) {
         case Nft721Event.NFT_MINTED:
            {
               await eventHandler.handleNFTMinted(event);
            }
            break;
      }
   };

   public static handleMarketEvents = async (
      event: any,
      dataSource: DataSource
   ) => {
      const eventHandler: EventHandler = new EventHandler(dataSource);

      switch (event.keys[0]) {
         case MarketEvent.NFT_LISTED:
            {
               await eventHandler.handleListNft(event);
            }
            break;
         case MarketEvent.NFT_CANCELLED:
            {
               await eventHandler.handleRemoveNftFromMarket(event);
            }
            break;
      }
   };

   public static getEvents = async (
      fromBlock: number,
      eventType: any,
      address: string
   ) => {
      console.log(`Start crawling event Scout`);
      const providerRPC = new RpcProvider({
         nodeUrl: constants.NetworkName.SN_SEPOLIA,
      });

      const lastBlock = fromBlock;
      const nextCursor: number =
         Number(lastBlock) + 100 < Number(lastBlock)
            ? Number(lastBlock)
            : Number(lastBlock) + 100;
      const eventsList = await providerRPC.getEvents({
         address: address,
         from_block: { block_number: Number(lastBlock) },
         to_block: { block_number: nextCursor },
         keys: [eventType],
         chunk_size: 100,
      });

      console.log(
         `DONE crawling event Point from ${lastBlock} to ${nextCursor}`
      );

      return eventsList.events;
   };
}
