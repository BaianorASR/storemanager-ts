import AppError from '../../../error/appError';
import { ISalesByIdDTO } from '../DTOs/Sales-DTO';
import { IGetByIdRepository } from '../repositories/GetById-Repository';

export class GetByIdUseCase {
  constructor(private repository: IGetByIdRepository) {}

  async execute(id: number): Promise<ISalesByIdDTO[]> {
    const product = await this.repository.getById(id);

    if (!product.length) throw new AppError('Sale not found', 404);

    return product;
  }
}
