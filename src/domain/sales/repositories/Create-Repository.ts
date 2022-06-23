import { ICreateSalesRegisterDTO, IRequestedSalesDTO } from '../DTOs/Requested-DTO';

export interface ICreateSalesRepository {
  create: (saleArray: Array<ICreateSalesRegisterDTO>) => Promise<IRequestedSalesDTO>;
}
