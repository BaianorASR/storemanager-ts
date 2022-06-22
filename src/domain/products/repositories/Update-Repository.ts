import { IProductsEntityDTO } from '../DTOs/Product-DTO';

export interface IUpdateProductRequested {
  name: string;
  quantity: number;
}

export interface IUpdateRepository {
  update(id: string, product: IUpdateProductRequested): Promise<IProductsEntityDTO>;
}
