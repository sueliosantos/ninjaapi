import { Column, Entity } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity({ name: "category" })
export class Category extends BaseEntity {
  @Column({ type: "varchar", length: 500 })
  name: string;

  @Column({ type: "varchar", length: 500, nullable: true })
  description: string;
}
