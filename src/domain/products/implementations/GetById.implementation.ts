import { RowDataPacket } from 'mysql2';

import connection from '../../../configs/mysql2';
import { IProductsEntityDTO } from '../DTOs/Product-DTO';
import { IGetByIdRepository } from '../repositories/GetById-Repository';

interface IDataSQL extends RowDataPacket, IProductsEntityDTO {}

export class GetByIdImplementation implements IGetByIdRepository {
  async getById(id: number): Promise<IProductsEntityDTO> {
    const Q = 'SELECT * FROM products WHERE id = ?';

    const [result] = await connection.execute<IDataSQL[]>(Q, [id]);

    return result[0];
  }
}
