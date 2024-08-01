import { Entity, Column } from "typeorm";
import { CustomBaseEntity } from "./base.entity";

@Entity({ name: "job_manager" })
export class JobManagerEntity extends CustomBaseEntity{

   @Column({ name: "contract_name" })
   contractName!: string;

   @Column({ name: "contract_address" })
   contractAddress!: string;

   @Column({ name: "status" })
   eventSeq!: string;

   @Column({ name: "job_name" })
   jobName!: string;

   constructor() {
      super();
   }
}
