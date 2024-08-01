import { DataSource } from "typeorm";
import { connectWithDatabase } from "./entities";
import "reflect-metadata";
import { RegistryEvent } from "./enums/event.enum";
import { CrawlerProcess } from "./helpers/crawler-process";
import { CrawlerType } from "./enums/crawler.enum";
// import { CrawlerConstants } from "./constants/crawler.constant";
import { Config } from "./config";


const config: Config = new Config();
const crawlNft721Item = async () => {
   let database: DataSource = await connectWithDatabase();
   let fromBlock: number = await CrawlerProcess.setUpFirstBlock(
      database,
      CrawlerType.NFT721_ITEM,
      79000
   );
   let events = await CrawlerProcess.getEvents(
      fromBlock,
      Object.values(RegistryEvent),
      config.ERC721_ITEM_CONTRACT_ADDRESS
   );

   const latestBlocknumber: number = await CrawlerProcess.getBlockNumber();
   await CrawlerProcess.updateCrawlerStatus(
      fromBlock + 100 < latestBlocknumber ? fromBlock + 100 : latestBlocknumber,
      database,
      CrawlerType.NFT721_ITEM
   );

   console.log("ERC721_ITEM ERC721_ITEM ERC721_ITEM ERC721_ITEM ERC721_ITEM ERC721_ITEM ERC721_ITEM");
   console.log(events);

   for (let event of events) {
      console.log(event.keys[0]);
      await CrawlerProcess.handleMarketEvents(event, database);
   }
};

crawlNft721Item();