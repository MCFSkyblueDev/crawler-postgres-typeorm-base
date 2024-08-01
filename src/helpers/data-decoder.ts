// import axios from "axios";
// import { EventType } from "../enums/event.enum";
// import { CrawlerConstants } from "../constants/crawler.constant";
// import { RpcProvider, Contract } from "starknet";
import { BigNumberish } from "starknet";

export class DataDecoder {
   static feltToStr = (felt: number) => {
      let hex = felt.toString(16);
      if (hex.length % 2 !== 0) {
         hex = "0" + hex;
      }
      const text = Buffer.from(hex, "hex").toString("utf8");
      return text;
   };

   static feltToInt = ({ low, high }: any) => {
      return Number((BigInt(high) << 64n) + BigInt(low));
   };

   static bigNumberishToHex(value: BigNumberish): string {
      const bigIntValue: bigint = BigInt(value);
      let hexValue: string = bigIntValue.toString(16);
      if (hexValue.length % 2 !== 0) {
         hexValue = "0" + hexValue;
      }
      return `0x${hexValue}`;
   }

   // static getCollectionInformation = async ({ contractAddress } : any) => {
   //    const provider = new RpcProvider({
   //       nodeUrl: CrawlerConstants.URL,
   //    });
   //    const { abi: contractAbi } = await provider.getClassAt(contractAddress);
   //    if (!contractAbi) return null;
   //    const contractView = new Contract(contractAbi, contractAddress, provider);
   //    const name = await contractView.name();
   //    const symbol = await contractView.symbol();
   //    const mintPrice = await contractView.get_mint_price(1);

   //    return {
   //       address: contractAddress,
   //       name: this.feltToStr(name),
   //       symbol: this.feltToStr(symbol),
   //       mintPrice: Number(mintPrice),
   //       image: "https://i.seadn.io/s/raw/files/af7296d9d79348b19bfdb151f5698cb7.gif?auto=format&dpr=1&w=1000",
   //    };
   // };
}
