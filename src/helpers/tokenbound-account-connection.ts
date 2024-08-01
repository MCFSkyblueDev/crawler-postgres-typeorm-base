import { TokenboundClient, WalletClient } from "starknet-tokenbound-sdk";
// import { CrawlerConstants } from "../constants/crawler.constant";
import { Config } from "../config";
import {} from "starknet";
// import { DataDecoder } from "./data-decoder";

const config: Config = new Config();
export class TokenboundAccountConnection {
   private tokenContractAddress: string;
   private tokenId: number;
   private tokenbound: TokenboundClient;

   private readonly salt = "123";

   constructor(tokenContractAddress: string, tokenId: number) {
      this.tokenContractAddress = tokenContractAddress;
      this.tokenId = tokenId;

      this.connectWithWalletClient();
   }

   private async connectWithWalletClient() {
      const walletClient: WalletClient = {
         address: config.WALLET_ADDRESS,
         privateKey: config.WALLET_PRIVATE_KEY,
      };

      const options = {
         walletClient: walletClient,
         registryAddress: config.REGISTRY_CONTRACT_ADDRESS,
         implementationAddress: config.PUBLIC_ACCOUNT_CLASS_HASH,

         jsonRPC: `https://starknet-sepolia.public.blastapi.io/rpc/v0_7`,
      };
      const tokenbound = new TokenboundClient(options);
      this.tokenbound = tokenbound;
   }

   public async getTokenboundAddress(): Promise<string> {
      const account = await this.tokenbound.getAccount({
         tokenContract: this.tokenContractAddress,
         tokenId: this.tokenId.toString(),
         salt: this.salt,
      });

      return account.toString();
   }

   public async getTokenboundOwner(tokenAboutAddress: string) {
      const nftOwner = await this.tokenbound.getOwner({
         tokenContract: this.tokenContractAddress,
         tokenId: this.tokenId.toString(),
         tbaAddress: tokenAboutAddress,
      });
      return nftOwner.toString();
   }
}
