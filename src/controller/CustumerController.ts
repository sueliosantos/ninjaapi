import { Custumer } from "../entity/Custumer";
import { BaseController } from "./BaseController";
import { Request } from "express";
import * as md5 from "md5";

export class CustumerController extends BaseController<Custumer> {
  constructor() {
    super(Custumer, true);
  }

  async save(req: Request) {
    let _custumer = <Custumer>req.body;
    super.isRequired(_custumer.name, "O nome é obrigatório");
    super.isRequired(_custumer.photo, "A foto é obrigatória");
    super.isRequired(_custumer.email, "O Email é obrigatória");

    delete _custumer.password;

    return super.save(_custumer, req);
  }

  async createCustumer(req: Request) {
    let _custumer = <Custumer>req.body;
    let { confirmPassword } = req.body;
    super.isRequired(_custumer.name, "O nome é obrigatório");
    super.isRequired(_custumer.photo, "A foto é obrigatória");
    super.isRequired(_custumer.email, "O Email é obrigatória");
    super.isRequired(_custumer.fone, "O Telefone é obrigatório");
    super.isRequired(_custumer.password, "A senha é obrigatória");
    super.isRequired(confirmPassword, "A confirmação da senha é obrigatória");

    super.isTrue(
      _custumer.password != confirmPassword,
      "As senhas precisam ser iguais"
    );

    if (_custumer.password) {
      _custumer.password = md5(_custumer.password);
    }

    return super.save(_custumer, req, true);
  }
}
