import { ISalesByIdDTO } from '../DTOs/Sales-DTO';

export interface IGetByIdRepository {
  getById(id: number): Promise<ISalesByIdDTO[]>;
}
