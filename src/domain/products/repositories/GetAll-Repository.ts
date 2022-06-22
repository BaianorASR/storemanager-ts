import { IProductsEntityDTO } from '../DTOs/Product-DTO';

export interface IGetAllRepository {
  getAll: () => Promise<IProductsEntityDTO[]>;
}
