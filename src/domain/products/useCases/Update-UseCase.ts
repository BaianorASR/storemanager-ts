import { IProductsEntityDTO } from '../DTOs/Product-DTO';
import {
  IUpdateProductRequested,
  IUpdateRepository,
} from '../repositories/Update-Repository';

export class UpdateUseCase {
  constructor(private readonly repository: IUpdateRepository) {}

  async execute(
    id: string,
    product: IUpdateProductRequested,
  ): Promise<IProductsEntityDTO> {
    return this.repository.update(id, product);
  }
}
