import { Column, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true, type: "boolean" })
  ativo: boolean;

  @Column({ default: false, type: "boolean" })
  deletado: boolean;

  @CreateDateColumn({ type: "timestamp" })
  createAt: Date;

  @CreateDateColumn({ type: "timestamp" })
  updateAt: Date;
}
