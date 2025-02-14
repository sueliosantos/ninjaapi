import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Category } from "./Category";

@Entity({ name: "subcategory" })
export class SubCategory extends BaseEntity {
  @Column({ type: "varchar", length: 100 })
  name: string;

  @Column()
  cost: number;

  @Column({ type: "varchar", length: 100, nullable: true })
  description: string;

  @ManyToOne(() => Category, { eager: true })
  category: Category;

  constructor() {
    super();
    this.category = new Category(); // Inicializa a propriedade category
  }
}
