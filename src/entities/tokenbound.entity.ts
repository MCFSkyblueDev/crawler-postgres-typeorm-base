import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { CustomBaseEntity } from "./base.entity";
import { CollectionEntity } from "./collection.entity";
import { NftEntity } from "./nft.entity";

@Entity("tokenbound_account")
export class TokenboundEntity extends CustomBaseEntity {
   @Column({ name: "tokenbound_address", type: "text", nullable: true })
   tokenboundAddress: string;

   @Column({ name: "wallet_address", type: "text", nullable: true })
   walletAddress: string;

   @Column({ name: "token_id", type: "integer", nullable: false, unique: true })
   tokenId: number;

   @Column({ type: "integer", default: 0 })
   point: number;

   @Column({ type: "text", nullable: true })
   name: string;

   @Column({ type: "text", nullable: true })
   image: string;

   @Column({ type: "float", default: 0 })
   price: number;

   @Column({ nullable: false, default: false })
   listing: Boolean;

   @JoinColumn({ name: "collection_id" })
   @ManyToOne(
      () => CollectionEntity,
      (collection) => collection.tokenboundAccounts
   )
   collection: CollectionEntity;

   @OneToMany(() => NftEntity, (nft) => nft.tokenboundAccount)
   nfts: NftEntity[];

   constructor(partial?: Partial<TokenboundEntity>) {
      super();
      Object.assign(this, partial);
   }
}
