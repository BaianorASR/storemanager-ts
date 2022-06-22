import {
  ICreateProductRequested,
  ICreateRepository,
} from '../repositories/Create-Repository';

export class CreateUseCase {
  constructor(private repository: ICreateRepository) {}

  async execute(product: ICreateProductRequested) {
    const productRequested = await this.repository.create(product);
    return productRequested;
  }
}
