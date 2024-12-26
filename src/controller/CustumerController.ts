import { Customer } from "../entity/Custumer";
import { BaseController } from "./BaseController";
import { Request } from "express";
import * as md5 from "md5";

export class CustomerController extends BaseController<Customer> {
  constructor() {
    super(Customer, true);
  }

  async save(req: Request) {
    let _customer = <Customer>req.body;
    super.isRequired(_customer.name, "O nome é obrigatório");
    super.isRequired(_customer.photo, "A foto é obrigatória");
    super.isRequired(_customer.email, "O Email é obrigatória");

    delete _customer.password;

    return super.save(_customer, req);
  }

  async createCustomer(req: Request) {
    let _customer = <Customer>req.body;
    let { confirmPassword } = req.body;
    super.isRequired(_customer.name, "O nome é obrigatório");
    super.isRequired(_customer.photo, "A foto é obrigatória");
    super.isRequired(_customer.email, "O Email é obrigatória");
    super.isRequired(_customer.fone, "O Telefone é obrigatório");
    super.isRequired(_customer.password, "A senha é obrigatória");
    super.isRequired(confirmPassword, "A confirmação da senha é obrigatória");

    super.isTrue(
      _customer.password != confirmPassword,
      "As senhas precisam ser iguais"
    );

    if (_customer.password) {
      _customer.password = md5(_customer.password);
    }

    return super.save(_customer, req, true);
  }
}
