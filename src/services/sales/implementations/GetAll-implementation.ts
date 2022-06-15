import { RowDataPacket } from 'mysql2';

import connection from '../../../configs/mysql2';
import { ISalesEntityDTO } from '../DTOs/Sales-DTO';
import { IGetAllRepository } from '../repositories/GetAll-Repository';

interface IDataSQL extends RowDataPacket, ISalesEntityDTO {}

export class GetAllImplementation implements IGetAllRepository {
  async getAll(): Promise<ISalesEntityDTO[]> {
    const Q =
      'SELECT sale_id, date, product_id, quantity FROM sales AS SALES INNER JOIN sales_products AS SALES_PRODUCTS ON SALES_PRODUCTS.sale_id = SALES.id ORDER BY sale_id ASC, product_id ASC';

    const [result] = await connection.execute<IDataSQL[]>(Q);

    return this.formatData(result);
  }

  private formatData(data: IDataSQL[]): ISalesEntityDTO[] {
    return data.map(row => ({
      saleId: row.sale_id,
      date: row.date,
      productId: row.product_id,
      quantity: row.quantity,
    }));
  }
}
