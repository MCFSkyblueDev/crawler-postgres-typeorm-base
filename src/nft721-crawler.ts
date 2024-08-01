import { DataSource } from "typeorm";
import { connectWithDatabase } from "./entities";
import "reflect-metadata";
// import { CrawlerStatusService } from "./services/crawler-status.service";
// import { CrawlerStatusEntity } from "./entities/crawler-status.entity";
import { Nft721Event } from "./enums/event.enum";
// import { EventHandler } from "./helpers/event-handler";
import { CrawlerProcess } from "./helpers/crawler-process";
import { CrawlerType } from "./enums/crawler.enum";
// import { CrawlerConstants } from "./constants/crawler.constant";
import { Config } from "./config";


const config: Config = new Config();
const crawlNft721 = async () => {
   let database: DataSource = await connectWithDatabase();
   let fromBlock: number = await CrawlerProcess.setUpFirstBlock(
      database,
      CrawlerType.NFT721,
      80300
   );
   let events = await CrawlerProcess.getEvents(
      fromBlock,
      Object.values(Nft721Event),
      config.ERC721_CONTRACT_ADDRESS
   );

   const latestBlocknumber: number = await CrawlerProcess.getBlockNumber();
   await CrawlerProcess.updateCrawlerStatus(
      fromBlock + 100 < latestBlocknumber ? fromBlock + 100 : latestBlocknumber,
      database,
      CrawlerType.NFT721
   );

   console.log("NFT721 NFT721 NFT721 NFT721 NFT721 NFT721");
   // console.log(events);
   for (let event of events) {
      console.log(event.keys[0]);
      // await CrawlerProcess.updateCrawlerStatus(
      //    event.block_number,
      //    database,
      //    CrawlerType.NFT721
      // );
      await CrawlerProcess.handleNftTokenboundEvents(event, database);
   }


   ///////////////////////
   // let fromBlockRegistryEvent: number = await CrawlerProcess.setUpFirstBlock(
   //    database,
   //    CrawlerType.REGISTRY,
   //    80300
   // );
   // let registryEvents = await CrawlerProcess.getEvents(
   //    fromBlock,
   //    Object.values(RegistryEvent),
   //    config.REGISTRY_CONTRACT_ADDRESS
   // );

   // const latestBlocknumberRegistryEvent: number = await CrawlerProcess.getBlockNumber();
   // await CrawlerProcess.updateCrawlerStatus(
   //    fromBlockRegistryEvent + 100 < latestBlocknumberRegistryEvent ? fromBlockRegistryEvent + 100 : latestBlocknumberRegistryEvent,
   //    database,
   //    CrawlerType.REGISTRY
   // );

   // console.log("REGISTRY REGISTRY REGISTRY REGISTRY REGISTRY REGISTRY");
   // console.log(events);

   // for (let event of registryEvents) {
   //    console.log(event.keys[0]);
   //    CrawlerProcess.handleEvents(event, database, CrawlerType.REGISTRY);
   // }

};

crawlNft721();
