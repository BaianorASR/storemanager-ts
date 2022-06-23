import { ICreateSalesRegisterDTO, IRequestedSalesDTO } from '../DTOs/Requested-DTO';
import { ICreateSalesRepository } from '../repositories/Create-Repository';

export class CreateSalesUseCase {
  constructor(private repository: ICreateSalesRepository) {}

  async execute(product: ICreateSalesRegisterDTO[]): Promise<IRequestedSalesDTO> {
    const productRequested = await this.repository.create(product);
    return productRequested;
  }
}
