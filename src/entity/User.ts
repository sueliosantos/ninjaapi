import { Entity, Column } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity({ name: "user" })
export class User extends BaseEntity {
  @Column({ type: "varchar", length: 100 })
  nome: string;

  @Column({ type: "varchar", length: 200, nullable: true })
  foto: string;

  @Column({ type: "varchar", length: 100 })
  email: string;

  @Column({ default: false, type: "boolean" })
  adm: boolean;

  @Column({ type: "varchar", length: 200 })
  senha: string;
}
