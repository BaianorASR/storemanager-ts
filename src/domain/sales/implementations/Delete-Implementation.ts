import { ResultSetHeader, RowDataPacket } from 'mysql2';

import connection from '../../../configs/mysql2';
import AppError from '../../../error/appError';
import { IDeleteSaleRepository } from '../repositories/Delete-Repository';

interface IQuantity extends RowDataPacket {
  quantity: number;
  id: number;
}

export class DeleteSalesImplementation implements IDeleteSaleRepository {
  async delete(id: string): Promise<void> {
    const arrayProductsQuantity = await this.getSalesQuantity(id);
    await this.executeDeleteSales(id);
    await this.executeUpdateProducts(arrayProductsQuantity);
  }

  private async getSalesQuantity(id: string): Promise<IQuantity[]> {
    const Q = 'SELECT product_id AS id, quantity FROM sales_products WHERE sale_id = ?';

    const [r] = await connection.execute<IQuantity[]>(Q, [id]);
    return r;
  }

  private async executeDeleteSales(id: string): Promise<void> {
    const Q = 'DELETE FROM sales WHERE id = ?';

    const [{ affectedRows }] = await connection.execute<ResultSetHeader>(Q, [id]);

    if (affectedRows === 0) {
      throw new AppError(404, 'Sale not found');
    }
  }

  private async executeUpdateProducts(arrayProductsQuantity: IQuantity[]): Promise<void> {
    const Q = 'UPDATE StoreManager.products SET quantity = quantity + ? WHERE id = ?';
    await Promise.all(
      arrayProductsQuantity.map(async ({ quantity, id }) => {
        const [{ affectedRows }] = await connection.execute<ResultSetHeader>(Q, [
          quantity,
          id,
        ]);
        console.log(affectedRows, quantity, id);
        return affectedRows;
      }),
    );
  }
}
