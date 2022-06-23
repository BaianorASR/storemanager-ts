import { ResultSetHeader } from 'mysql2';

import connection from '../../../configs/mysql2';
import { ICreateSalesRegisterDTO, IRequestedSalesDTO } from '../DTOs/Requested-DTO';
import { ICreateSalesRepository } from '../repositories/Create-Repository';

export class CreateSalesImplementation implements ICreateSalesRepository {
  async create(saleArray: ICreateSalesRegisterDTO[]): Promise<IRequestedSalesDTO> {
    const saleID = await this.executeInsertNewSale();
    await this.executeUpdateSalesProducts(saleArray, saleID);
    await this.executeUpdateProductsAmount(saleArray);

    return {
      id: saleID,
      itemsSold: saleArray,
    };
  }

  // Create New Sale for get ID to Products
  private async executeInsertNewSale() {
    const Q = 'INSERT INTO StoreManager.sales (date) VALUES (CURRENT_TIMESTAMP())';
    const [{ insertId }] = await connection.execute<ResultSetHeader>(Q);

    return insertId;
  }

  // Insert data for relation the last products sales insert
  private async executeUpdateSalesProducts(
    saleArray: ICreateSalesRegisterDTO[],
    saleID: number,
  ) {
    const Q =
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)';

    await Promise.all(
      saleArray.map(async ({ productId, quantity }) => {
        await connection.execute<ResultSetHeader>(Q, [saleID, productId, quantity]);
      }),
    );
  }

  // Update Products quantity
  private async executeUpdateProductsAmount(saleArray: ICreateSalesRegisterDTO[]) {
    await Promise.all(
      saleArray.map(async ({ productId, quantity }) => {
        const Q = 'UPDATE StoreManager.products SET quantity = quantity - ? WHERE id = ?';
        await connection.execute<ResultSetHeader>(Q, [quantity, productId]);
      }),
    );
  }
}
