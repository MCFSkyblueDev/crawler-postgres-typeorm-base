import { TokenboundAccountConnection } from "./helpers/tokenbound-account-connection";


const start = async () => {
   const tokenboundAccount : TokenboundAccountConnection = await new TokenboundAccountConnection("0x3db01791473a0cdd42a703f43c4a4c349b652086820d4e10e316b829ed771ce", 1);
   // await tokenboundAccount.init();
   const tokenboundAddress : string = await tokenboundAccount.getTokenboundAddress();
   console.log(tokenboundAddress);
}

start();