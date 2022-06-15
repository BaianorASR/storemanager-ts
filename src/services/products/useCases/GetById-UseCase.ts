import AppError from '../../../error/appError';
import { IProductsEntityDTO } from '../DTOs/Product-DTO';
import { IGetByIdRepository } from '../repositories/GetById-Repository';

export class GetByIdUseCase {
  constructor(private repository: IGetByIdRepository) {}

  async execute(id: number): Promise<IProductsEntityDTO> {
    const product = await this.repository.getById(id);

    if (!product) throw new AppError('Product not found', 404);

    return product;
  }
}
