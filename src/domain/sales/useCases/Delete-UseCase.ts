import { IDeleteSaleRepository } from '../repositories/Delete-Repository';

export class DeleteSalesUseCase {
  constructor(private readonly repository: IDeleteSaleRepository) {}

  async execute(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
