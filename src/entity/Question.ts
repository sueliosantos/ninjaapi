import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { QuestionType } from "../enum/QuetionType";
import { SubCategory } from "./SubCategory";

@Entity({ name: "question" })
export class Question extends BaseEntity {
  @Column({ type: "varchar", length: 200 })
  question: string;

  @Column()
  type: QuestionType;

  @Column({ type: "varchar", length: 1000, nullable: true })
  options: string;

  @ManyToOne(() => SubCategory, { eager: true })
  subCategory: SubCategory;
}
