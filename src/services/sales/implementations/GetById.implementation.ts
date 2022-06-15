import { RowDataPacket } from 'mysql2';

import connection from '../../../configs/mysql2';
import { ISalesByIdDTO } from '../DTOs/Sales-DTO';
import { IGetByIdRepository } from '../repositories/GetById-Repository';

interface IDataSQL extends RowDataPacket, ISalesByIdDTO {}

export class GetByIdImplementation implements IGetByIdRepository {
  async getById(id: number): Promise<ISalesByIdDTO[]> {
    const Q =
      'SELECT  date, product_id, quantity FROM sales AS SALES INNER JOIN sales_products AS SALES_PRODUCTS ON SALES_PRODUCTS.sale_id = SALES.id WHERE SALES.id = ? ORDER BY sale_id ASC, product_id ASC';

    const [result] = await connection.execute<IDataSQL[]>(Q, [id]);

    return this.formatData(result);
  }

  private formatData(data: IDataSQL[]): ISalesByIdDTO[] {
    return data.map(row => ({
      date: row.date,
      productId: row.product_id,
      quantity: row.quantity,
    }));
  }
}
