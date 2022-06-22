import AppError from '../../../error/appError';
import {
  IGetByIdRepository,
  IGetByIdSalesRequested,
} from '../repositories/GetById-Repository';

export class GetByIdUseCase {
  constructor(private repository: IGetByIdRepository) {}

  async execute(id: number): Promise<IGetByIdSalesRequested[]> {
    const product = await this.repository.getById(id);

    if (!product.length) throw new AppError(404, 'Sale not found');

    return product;
  }
}
