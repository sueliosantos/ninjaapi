import { Category } from "../entity/Category";
import { BaseController } from "./BaseController";
import { Request } from "express";

export class CategoryController extends BaseController<Category> {
  constructor() {
    super(Category, true);
  }

  async save(req: Request) {
    let _category = <Category>req.body;
    super.isRequired(_category.name, "O nome da categoria é obrigatório");
    super.isRequired(
      _category.description,
      "A descrição da categoria é obrigatório"
    );

    return super.save(_category, req);
  }
}
