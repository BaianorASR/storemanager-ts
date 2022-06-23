import { ResultSetHeader, RowDataPacket } from 'mysql2';

import connection from '../../../configs/mysql2';
import AppError from '../../../error/appError';
import { ICreateSalesRegisterDTO } from '../DTOs/Requested-DTO';
import {
  IRequestedUpdateSales,
  IUpdateSalesRepository,
} from '../repositories/Update-Repository';

export class UpdateSalesImplementation implements IUpdateSalesRepository {
  async update(
    id: string,
    salesArray: ICreateSalesRegisterDTO[],
  ): Promise<IRequestedUpdateSales> {
    await this.verifyIfSaleAlreadyExists(id);
    await this.executeUpdateSalesProducts(id, salesArray);
    await this.executeUpdateProductsAmount(salesArray);

    return {
      saleId: Number(id),
      itemUpdated: salesArray,
    };
  }

  private async verifyIfSaleAlreadyExists(saleId: string) {
    const Q = 'SELECT * FROM StoreManager.sales WHERE id = ?';

    const [result] = await connection.execute<RowDataPacket[]>(Q, [saleId]);

    if (!result.length) {
      throw new AppError(404, 'Sale not found!');
    }
  }

  private async executeUpdateSalesProducts(
    saleId: string,
    salesArray: ICreateSalesRegisterDTO[],
  ) {
    const Q =
      'UPDATE StoreManager.sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?';

    await Promise.all(
      salesArray.map(async ({ productId, quantity }) => {
        await connection.execute<ResultSetHeader>(Q, [quantity, saleId, productId]);
      }),
    );
  }

  private async executeUpdateProductsAmount(salesArray: ICreateSalesRegisterDTO[]) {
    const Q = 'UPDATE StoreManager.products SET quantity = quantity - ? WHERE id = ?';

    await Promise.all(
      salesArray.map(async ({ quantity, productId }) => {
        await connection.execute<ResultSetHeader>(Q, [quantity, productId]);
      }),
    );
  }
}
