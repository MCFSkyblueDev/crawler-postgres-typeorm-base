import { Entity, Column } from "typeorm";
import { CustomBaseEntity } from "./base.entity";

@Entity({ name: "crawler_status" })
export class CrawlerStatusEntity extends CustomBaseEntity {
   @Column({ name: "contract_name" })
   contractName: string;

   @Column({ name: "contract_address" })
   contractAddress: string;

   @Column({ name: "event_seq" })
   eventSeq: number;

   @Column({ name: "block_timestamp" })
   blockTimestamp: Date;

   constructor(partial?: Partial<CrawlerStatusEntity>) {
      super();
      Object.assign(this, partial);
   }
}
