import { ResultSetHeader, RowDataPacket } from 'mysql2';

import connection from '../../../configs/mysql2';
import { IProductsEntityDTO } from '../DTOs/Product-DTO';
import {
  ICreateProductRequested,
  ICreateRepository,
} from '../repositories/Create-Repository';

export class CreateImplementation implements ICreateRepository {
  async create(product: ICreateProductRequested): Promise<IProductsEntityDTO> {
    const Q = 'INSERT INTO StoreManager.products (name, quantity) VALUES (?,?)';

    const [result] = await connection.execute<ResultSetHeader>(Q, [
      ...Object.values(product),
    ]);

    return { id: result.insertId, ...product };
  }
}
