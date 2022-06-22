import { ISalesEntityDTO } from '../DTOs/Sales-DTO';

export interface IGetAllRepository {
  getAll: () => Promise<ISalesEntityDTO[]>;
}
