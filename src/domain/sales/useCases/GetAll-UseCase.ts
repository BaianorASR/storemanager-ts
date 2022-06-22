import { ISalesProductsEntityDTO } from '../../../DTOs/SalesProducts-DTO';
import { IGetAllRepository } from '../repositories/GetAll-Repository';

export class GetAllUseCase {
  constructor(private repository: IGetAllRepository) {}

  async execute(): Promise<ISalesProductsEntityDTO[]> {
    const allProducts = await this.repository.getAll();
    return allProducts;
  }
}
