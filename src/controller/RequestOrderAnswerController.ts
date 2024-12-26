import { Request } from "express";
import { BaseController } from "./BaseController";
import { RequestOrderAnswer } from "../entity/RequestOrderAnswer";
import { BaseEntity, FindOptionsWhere, Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { RequestOrder } from "../entity/RequestOrder";

export class RequestOrderAnswerController extends BaseController<RequestOrderAnswer> {
  constructor() {
    super(RequestOrderAnswer, false);
  }

  async all(request: Request) {
    let { orderId } = request.params;

    if (!orderId)
      return { status: 400, message: "Informe o código da requisição" };

    return this.repository.find({
      where: { orderId: orderId } as FindOptionsWhere<RequestOrderAnswer>,
    });
  }

  async save(request: Request) {
    let _request = <RequestOrderAnswer>request.body;

    super.isRequired(_request.answer, "Informe a resposta da pergunta");
    super.isRequired(_request.question, "A questão precisa ser informada");
    super.isRequired(_request.requestOrder, "Informe a requisição");

    return super.save(_request, request);
  }
}
