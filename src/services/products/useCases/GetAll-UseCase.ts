import { IProductsEntityDTO } from '../DTOs/Product-DTO';
import { IGetAllRepository } from '../repositories/GetAll-Repository';

export class GetAllUseCase {
  constructor(private repository: IGetAllRepository) {}

  async execute(): Promise<IProductsEntityDTO[]> {
    const allProducts = await this.repository.getAll();
    return allProducts;
  }
}
