import { ICreateSalesRegisterDTO } from '../DTOs/Requested-DTO';

export interface IRequestedUpdateSales {
  saleId: number;
  itemUpdated: Array<ICreateSalesRegisterDTO>;
}

export interface IUpdateSalesRepository {
  update: (
    id: string,
    saleArray: Array<ICreateSalesRegisterDTO>,
  ) => Promise<IRequestedUpdateSales>;
}
