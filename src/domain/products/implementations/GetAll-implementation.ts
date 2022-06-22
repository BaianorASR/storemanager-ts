import { RowDataPacket } from 'mysql2';

import connection from '../../../configs/mysql2';
import { IProductsEntityDTO } from '../DTOs/Product-DTO';
import { IGetAllRepository } from '../repositories/GetAll-Repository';

interface IDataSQL extends RowDataPacket, IProductsEntityDTO {}

export class GetAllImplementation implements IGetAllRepository {
  async getAll(): Promise<IProductsEntityDTO[]> {
    const Q = 'SELECT * FROM products';

    const [result] = await connection.execute<IDataSQL[]>(Q);

    return result;
  }
}
