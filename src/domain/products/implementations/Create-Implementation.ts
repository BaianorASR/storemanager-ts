import { ResultSetHeader, RowDataPacket } from 'mysql2';

import connection from '../../../configs/mysql2';
import AppError from '../../../error/appError';
import { IProductsEntityDTO } from '../DTOs/Product-DTO';
import {
  ICreateProductRequested,
  ICreateRepository,
} from '../repositories/Create-Repository';

interface IDataSQL extends RowDataPacket, IProductsEntityDTO {}

export class CreateImplementation implements ICreateRepository {
  async create(product: ICreateProductRequested): Promise<IProductsEntityDTO> {
    await this.verifyIfProductAlreadyExists(product.name);

    const Q = 'INSERT INTO StoreManager.products (name, quantity) VALUES (?,?)';

    const [result] = await connection.execute<ResultSetHeader>(Q, [
      ...Object.values(product),
    ]);

    return { id: result.insertId, ...product };
  }

  private async verifyIfProductAlreadyExists(name: string) {
    const Q = 'SELECT * FROM StoreManager.products WHERE name = ?';

    const [result] = await connection.execute<IDataSQL[]>(Q, [name]);

    if (result.length) {
      throw new AppError(409, 'Product already exists');
    }
  }
}
