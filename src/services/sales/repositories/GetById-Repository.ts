import { ISalesEntityDTO } from '../DTOs/Sales-DTO';

export type IGetByIdSalesRequested = Omit<ISalesEntityDTO, 'saleId'>;

export interface IGetByIdRepository {
  getById(id: number): Promise<IGetByIdSalesRequested[]>;
}
