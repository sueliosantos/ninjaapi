import { User } from "../entity/User";
import { BaseController } from "./BaseController";
import { Request } from "express";
import * as md5 from "md5";
import config from "../configuration/config";
import { sign } from "jsonwebtoken";

export class UserController extends BaseController<User> {
  constructor() {
    super(User);
  }

  async auth(request: Request) {
    let { email, senha } = request.body;

    if (!email || !senha)
      return {
        status: 400,
        message: "Informe o email e a senha para efetuar o login",
      };

    let user = await this.repository.findOneBy({
      email: email,
      senha: md5(senha),
    });

    if (user) {
      let _payload = {
        id: user.id,
        name: user.nome,
        foto: user.foto,
        email: user.email,
      };
      return {
        status: 200,
        message: {
          user: _payload,
          token: sign(
            {
              ..._payload,
              tm: new Date().getTime(),
            },
            config.secretyKey
          ),
        },
      };
    } else return { status: 404, message: "E-mail ou senha inválidos" };
  }
  async createUser(req: Request) {
    let { nome, email, senha, confirmarSenha, foto, adm } = req.body;

    super.isRequired(nome, "Informe o nome");
    super.isRequired(email, "Informe o e-mail");
    super.isRequired(senha, "Informe a senha");
    super.isRequired(confirmarSenha, "Informe a confirmação da senha");
    super.isRequired(foto, "Informe a foto");

    let _user = new User();
    _user.nome = nome;
    _user.email = email;

    if (senha != confirmarSenha)
      return { status: 400, errors: ["A senha e a confirmação são diferente"] };

    if (senha) {
      _user.senha = md5(senha);
    }
    _user.foto = foto;
    _user.adm = adm;

    return super.save(_user, req);
  }
  async save(req: Request) {
    let _user = <User>req.body;
    super.isRequired(_user.nome, "O nome do usuário é obrigatório");
    super.isRequired(_user.foto, "A foto do usuário é obrigatório");
    super.isRequired(_user.email, "O email do usuário é obrigatório");
    super.isRequired(_user.senha, "A senha do usuário é obrigatório");

    return super.save(_user, req);
  }
}
