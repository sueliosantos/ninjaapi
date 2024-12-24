import { Request } from "express";
import {
  BaseEntity,
  FindOneOptions,
  FindOptionsWhere,
  getRepository,
  Repository,
} from "typeorm";
import { BaseNotification } from "../entity/BaseNotification";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

export abstract class BaseController<T> extends BaseNotification {
  private _repository: Repository<T>;
  private _onlyRootController: boolean = false;

  public errorRoot: any = {
    status: 401,
    errors: ["Você não está autorizado a executar essa funcionalidade"],
  };

  constructor(entity: any, onlyRoot: boolean = false) {
    super();
    this._repository = AppDataSource.getRepository<T>(entity);
    this._onlyRootController = onlyRoot;
  }

  public checkNotPermission(request: Request) {
    return this._onlyRootController && !request.IsRoot;
  }
  async all(request: Request) {
    if (this.checkNotPermission(request)) return this.errorRoot;
    return this._repository.find({
      where: { deletado: false } as FindOptionsWhere<BaseEntity>,
    });
  }

  async one(request: Request) {
    if (this.checkNotPermission(request)) return this.errorRoot;
    return await this._repository.findOneById(request.params.id);
  }

  async save(model: any, request: Request) {
    if (this.checkNotPermission(request)) return this.errorRoot;

    if (model.id) {
      delete model["deletado"];
      delete model["createAt"];

      let _idDB = await this._repository.findOne({
        where: { id: model.id } as FindOptionsWhere<BaseEntity>,
      });

      if (_idDB) {
        Object.assign(_idDB, model);
      }
    }

    if (this.valid()) {
      return await this._repository.save(model);
    } else {
      return {
        status: 400,
        errors: this.allNotifications,
      };
    }
  }

  async remove(request: Request) {
    if (this.checkNotPermission(request)) return this.errorRoot;
    let id = request.params.id;
    let model: any = await this._repository.findOne({
      where: { id: id } as FindOptionsWhere<BaseEntity>,
    });

    if (model) {
      model.deletado = true;
      return this._repository.save(model);
    } else {
      return {
        status: 404,
        errors: ["Item não encontrado"],
      };
    }
  }

  get repository(): Repository<T> {
    return this._repository;
  }
}
