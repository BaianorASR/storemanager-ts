import { IProductsEntityDTO } from '../DTOs/Product-DTO';

export interface IGetByIdRepository {
  getById(id: number): Promise<IProductsEntityDTO>;
}
