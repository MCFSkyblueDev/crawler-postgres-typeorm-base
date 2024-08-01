import {
   Entity,
   Column,
   ManyToOne,
   JoinColumn,
} from "typeorm";
import { CollectionEntity } from "./collection.entity";
import { CustomBaseEntity } from "./base.entity";
import { TokenboundEntity } from "./tokenbound.entity";

@Entity({ name: "nft" })
export class NftEntity extends CustomBaseEntity {
   @Column({ name: "token_id" })
   tokenId: number;

   @Column({ nullable: false })
   name: string;

   @Column({ nullable: false })
   image: string;

   @Column({ nullable: false })
   price: Number;

   @Column({ nullable: false, default: false })
   listing: Boolean;

   @Column({ nullable: false, default: () => "CURRENT_TIMESTAMP" })
   timestamp: Date;

   @JoinColumn({ name: 'collection_id' })
   @ManyToOne(() => CollectionEntity, (collection) => collection.nfts)
   collection: CollectionEntity;

   @JoinColumn({ name: 'tokenbound_id' })
   @ManyToOne(() => TokenboundEntity, (tokenbound) => tokenbound.nfts)
   tokenboundAccount: TokenboundEntity;

   constructor(partial?: Partial<NftEntity>) {
      super();
      Object.assign(this, partial);
   }
}
