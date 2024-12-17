import { SubCategory } from "../entity/SubCategory";
import { BaseController } from "./BaseController";
import { Request } from "express";

export class SubCategoryController extends BaseController<SubCategory> {
  constructor() {
    super(SubCategory);
  }

  async save(req: Request) {
    let _subcategory = <SubCategory>req.body;
    super.isRequired(_subcategory.name, "O nome da subcategoria é obrigatório");
    super.isRequired(_subcategory.cost, "o preço é obrigatório");
    super.isRequired(_subcategory.category, "A categoria é obrigatório");
    super.isTrue(isNaN(_subcategory.cost), "o Custo deve ser um número");
    super.isTrue(_subcategory.cost <= 0, "o Custo deve ser ser maior que zero");

    return super.save(_subcategory);
  }
}
