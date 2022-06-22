import { ResultSetHeader, RowDataPacket } from 'mysql2';

import connection from '../../../configs/mysql2';
import AppError from '../../../error/appError';
import type { IProductsEntityDTO } from '../DTOs/Product-DTO';
import type {
  IUpdateProductRequested,
  IUpdateRepository,
} from '../repositories/Update-Repository';

interface IDataSQL extends RowDataPacket, IProductsEntityDTO {}

export class UpdateImplementation implements IUpdateRepository {
  async update(
    id: string,
    product: IUpdateProductRequested,
  ): Promise<IProductsEntityDTO> {
    await this.verifyIfProductAlreadyExists(id);

    const Q = 'UPDATE products SET name = ?, quantity = ? WHERE id = ?';

    const [result] = await connection.execute<ResultSetHeader>(Q, [
      product.name,
      product.quantity,
      id,
    ]);

    return this.updatedProduct(+result.insertId, product);
  }

  private updatedProduct(
    id: number,
    product: IUpdateProductRequested,
  ): IProductsEntityDTO {
    return {
      id,
      ...product,
    };
  }

  private async verifyIfProductAlreadyExists(id: string) {
    const Q = 'SELECT * FROM StoreManager.products WHERE id = ?';

    const [result] = await connection.execute<IDataSQL[]>(Q, [id]);

    if (!result.length) {
      throw new AppError(404, 'Product not found');
    }
  }
}
