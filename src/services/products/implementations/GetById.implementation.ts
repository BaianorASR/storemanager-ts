import { RowDataPacket } from 'mysql2';

import connection from '../../../configs/mysql2';
import { IProductsEntityDTO } from '../DTOs/Product-DTO';
import { IGetByIdRepository } from '../repositories/GetById-Repository';

interface IUser extends RowDataPacket, IProductsEntityDTO {}

export class GetByIdImplementation implements IGetByIdRepository {
  async getById(id: number): Promise<IProductsEntityDTO> {
    const Q = 'SELECT * FROM products WHERE id = ?';

    const [result] = await connection.execute<IUser[]>(Q, [id]);

    return result[0];
  }
}
