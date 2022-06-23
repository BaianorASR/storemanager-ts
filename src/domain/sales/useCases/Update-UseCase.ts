import { ICreateSalesRegisterDTO } from '../DTOs/Requested-DTO';
import { IUpdateSalesRepository } from '../repositories/Update-Repository';

export class UpdateSalesUseCase {
  constructor(private repository: IUpdateSalesRepository) {}

  async execute(id: string, sales: ICreateSalesRegisterDTO[]) {
    const saleRequested = await this.repository.update(id, sales);
    return saleRequested;
  }
}
