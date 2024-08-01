import { config } from "dotenv";

config();

export class Config {
   public DATABASE_HOST: string;
   public DATABASE_USER: string;
   public DATABASE_PASSWORD: string;
   public DATABASE_NAME: string;
   public DATABASE_PORT: number;
   public JWT_SECRET: string;
   public PORT: number;

   public PUBLIC_ACCOUNT_CLASS_HASH: string;
   public WALLET_ADDRESS: string; 
   public WALLET_PRIVATE_KEY: string;

   public REGISTRY_CONTRACT_ADDRESS: string;
   public ERC721_CONTRACT_ADDRESS: string;
   public MARKET_CONTRACT_ADDRESS: string;
   public ERC721_ITEM_CONTRACT_ADDRESS: string;
   public ERC20: string;

   constructor() {
      // this.DATABASE_HOST =
      //    process.env.DATABASE_HOST ||
      //    "localhost";
      // this.DATABASE_USER = process.env.DATABASE_USER || "postgres";
      // this.DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || "Phongsql123";
      // this.DATABASE_NAME = process.env.DATABASE_NAME || "ventorii-nft";
      // this.DATABASE_PORT = Number(process.env.DATABASE_PORT) || 5432;
      // this.PORT = Number(process.env.PORT) || 5000;
      // this.JWT_SECRET =
      //    process.env.JWT_SECRET || "dijgnidfgidgojdngkdsfjnfkdjsngkjenf";


      this.PUBLIC_ACCOUNT_CLASS_HASH =
         process.env.PUBLIC_ACCOUNT_CLASS_HASH ||
         "0x044a1e8271aa670a54b6b54fd1c20083e8ac310bfe1e319c418b87930a2357a5";

      this.WALLET_ADDRESS =
         process.env.WALLET_ADDRESS ||
         "0x01c41e7e3fef67E9648b96349d312F78fBe52c0b0196D767C7777104d33fc874";
      this.WALLET_PRIVATE_KEY =
         process.env.WALLET_PRIVATE_KEY ||
         "0x03a3059f198132aa5eceb56124c141621dc222fb8e26e3c4a615522c944192d8";

      this.REGISTRY_CONTRACT_ADDRESS =
         process.env.REGISTRY_CONTRACT_ADDRESS ||
         "0x020d025aa54cea1c0c178abb7e7a421d866de7b578cc45ca99f7fdb9c6d82922";
      this.ERC721_CONTRACT_ADDRESS =
         process.env.ERC721_CONTRACT_ADDRESS ||
         "0x03db01791473a0cdd42a703f43c4a4c349b652086820d4e10e316b829ed771ce";
      this.MARKET_CONTRACT_ADDRESS =
         process.env.MARKET_CONTRACT_ADDRESS ||
         "0x014131f40995c174794adf259caf6c7e18726326adcb0bd37dfc75ccf6ff1792";
      this.ERC721_ITEM_CONTRACT_ADDRESS =
         process.env.ERC721_ITEM_CONTRACT_ADDRESS || "";
      this.ERC20 =
         process.env.ERC20 ||
         "0x0325f23c7c20e395e23c3b78b61de6a4e26759e9696977a1b5a174229f241392";
   }
}
