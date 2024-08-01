import { Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({ name: "collection" })
export class CustomBaseEntity {
   @PrimaryGeneratedColumn()
   id: number;
}
