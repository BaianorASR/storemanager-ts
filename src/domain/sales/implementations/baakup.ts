import { ResultSetHeader } from 'mysql2';

import connection from '../../../configs/mysql2';
import { ICreateSalesRegisterDTO, IRequestedSalesDTO } from '../DTOs/Requested-DTO';
import { ICreateSalesRepository } from '../repositories/Create-Repository';

export class CreateSalesImplementation implements ICreateSalesRepository {
  async create(saleArray: ICreateSalesRegisterDTO[]): Promise<IRequestedSalesDTO> {
    const arrayOfInsertID = await this.executeUpdateSales(saleArray);
    const arrayOfInsertAllSales = await this.executeInsertSale(
      saleArray,
      arrayOfInsertID,
    );

    return arrayOfInsertAllSales as unknown as IRequestedSalesDTO;
  }

  private async executeUpdateSales(saleArray: ICreateSalesRegisterDTO[]) {
    const Q = 'UPDATE StoreManager.sales SET quantity = ? WHERE id = ?';

    const arrayOfInsertID = await Promise.all(
      saleArray.map(async ({ productId, quantity }) => {
        const [{ insertId }] = await connection.execute<ResultSetHeader>(Q, [
          quantity,
          productId,
        ]);
        return insertId;
      }),
    );

    return arrayOfInsertID;
  }

  private async executeInsertSale(
    saleArray: ICreateSalesRegisterDTO[],
    arrayOfSaleID: number[],
  ) {
    const Q =
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)';

    const insertAllSales = await Promise.all(
      saleArray.map(async ({ productId, quantity }, index) => {
        const [{ insertId }] = await connection.execute<ResultSetHeader>(Q, [
          arrayOfSaleID[index],
          quantity,
          productId,
        ]);
        return insertId;
      }),
    );

    return insertAllSales;
  }
}
