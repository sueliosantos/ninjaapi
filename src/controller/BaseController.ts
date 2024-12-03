import { Request } from "express";
import { FindOneOptions, getRepository, Repository } from "typeorm";
import { BaseNotification } from "../entity/BaseNotification";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

export abstract class BaseController<T> extends BaseNotification {
  private _repository: Repository<T>;

  constructor(entity: any) {
    super();
    this._repository = AppDataSource.getRepository<T>(entity);
  }
  async all() {
    return this._repository.find();
  }

  async one(request: Request) {
    return await this._repository.findOneById(request.params.id);
  }

  async save(model: any) {
    if (model.id) {
      let _idDB = await this._repository.findOne(model.id);

      if (_idDB) {
        Object.assign(_idDB, model);
      }
    }

    if (this.valid()) {
      return this._repository.save(model);
    } else {
      return {
        status: 400,
        erros: this.allNotifications,
      };
    }
  }

  async remove(request: Request) {
    let id = request.params.id;
    let model: any = await this._repository.findOne(id);
    if (model) {
      model.deletado = true;
    }
    return this._repository.save(model);
  }

  get repository(): Repository<T> {
    return this._repository;
  }
}
