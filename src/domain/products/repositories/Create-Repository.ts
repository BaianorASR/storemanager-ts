import { IProductsEntityDTO } from '../DTOs/Product-DTO';

export interface ICreateProductRequested {
  name: string;
  quantity: number;
}

export interface ICreateRepository {
  create: (product: ICreateProductRequested) => Promise<IProductsEntityDTO>;
}
