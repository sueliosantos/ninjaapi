import { Question } from "../entity/Question";
import { QuestionType } from "../enum/QuetionType";
import { BaseController } from "./BaseController";
import { Request } from "express";

export class QuestionController extends BaseController<Question> {
  constructor() {
    super(Question);
  }

  async save(req: Request) {
    let _question = <Question>req.body;
    super.isRequired(_question.question, "A pergunta é obrigatório");
    super.isRequired(_question.type, "O tipo da pergunta é obrigatoria");
    super.isRequired(_question.subCategory, "Informe a Subcategoria");

    if (<number>_question.type === QuestionType.Select) {
      super.isRequired(
        _question.options,
        "Para o tipo Selecione você deve informar quais as opções"
      );
    }

    return super.save(_question, req);
  }
}
