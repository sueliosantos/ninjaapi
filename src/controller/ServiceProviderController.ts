import { Request } from "express";
import { BaseController } from "./BaseController";
import * as md5 from "md5";
import { ServiceProvider } from "../entity/ServiceProvider";

export class ServiceProviderController extends BaseController<ServiceProvider> {
  constructor() {
    super(ServiceProvider, true);
  }

  private validationDefault(_serviceProvider: ServiceProvider): void {
    super.isRequired(_serviceProvider.name, "O nome é obrigatório");
    super.isRequired(_serviceProvider.photo, "A foto é obrigatória");
    super.isRequired(_serviceProvider.email, "E-mail é obrigatório");
    super.isRequired(_serviceProvider.phone, "Telefone é obrigatório");
    super.isRequired(
      _serviceProvider.categoriesCare,
      "Informe as categorias atendidas"
    );
    super.isRequired(
      _serviceProvider.citiesCare,
      "Informe as cidades atendidas"
    );
    super.isRequired(_serviceProvider.zipCode, "Informe o CEP");
    super.isRequired(_serviceProvider.state, "Informe o estado");
  }

  async save(request: Request) {
    let _serviceProvider = <ServiceProvider>request.body;

    this.validationDefault(_serviceProvider);

    delete _serviceProvider.password;

    return super.save(_serviceProvider, request);
  }

  async createServiceProvider(request: Request) {
    let _serviceProvider = <ServiceProvider>request.body;
    let { confirmPassword } = request.body;

    this.validationDefault(_serviceProvider);
    super.isRequired(_serviceProvider.password, "Informe sua senha");
    super.isRequired(confirmPassword, "A confirmação da senha é obrigatório");
    super.isTrue(
      _serviceProvider.password != confirmPassword,
      "A senha e a confirmação de senha estão diferentes"
    );

    if (_serviceProvider.password)
      _serviceProvider.password = md5(_serviceProvider.password);

    return super.save(_serviceProvider, request, true);
  }
}
