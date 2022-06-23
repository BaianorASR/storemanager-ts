import { ResultSetHeader, RowDataPacket } from 'mysql2';

import connection from '../../../configs/mysql2';
import AppError from '../../../error/appError';
import { ICreateSalesRegisterDTO, IRequestedSalesDTO } from '../DTOs/Requested-DTO';
import { ICreateSalesRepository } from '../repositories/Create-Repository';

export class CreateSalesImplementation implements ICreateSalesRepository {
  async create(salesArray: ICreateSalesRegisterDTO[]): Promise<IRequestedSalesDTO> {
    await this.checkIfHaveQuantityAvailable(salesArray);

    const salesId = await this.executeInsertNewSale();
    await this.executeUpdateSalesProducts(salesArray, salesId);
    await this.executeUpdateProductsAmount(salesArray);

    return {
      id: salesId,
      itemsSold: salesArray,
    };
  }

  private async checkIfHaveQuantityAvailable(salesArray: ICreateSalesRegisterDTO[]) {
    interface IQuantity extends RowDataPacket {
      quantity: number;
    }

    salesArray.forEach(async (sale: ICreateSalesRegisterDTO) => {
      const Q = 'SELECT quantity FROM StoreManager.products WHERE id = ?';
      const [result] = await connection.execute<IQuantity[]>(Q, [sale.productId]);

      if (result[0].quantity - sale.quantity < 0) {
        throw new AppError(500, 'A quantidade disponível é menor que o solicitado');
      }
    });
  }

  // Create New Sale for get ID to Products
  private async executeInsertNewSale() {
    const Q = 'INSERT INTO StoreManager.sales (date) VALUES (CURRENT_TIMESTAMP())';
    const [{ insertId }] = await connection.execute<ResultSetHeader>(Q);

    return insertId;
  }

  // Insert data for relation the last products sales insert
  private async executeUpdateSalesProducts(
    salesArray: ICreateSalesRegisterDTO[],
    salesId: number,
  ) {
    const Q =
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)';

    await Promise.all(
      salesArray.map(async ({ productId, quantity }) => {
        await connection.execute<ResultSetHeader>(Q, [salesId, productId, quantity]);
      }),
    );
  }

  // Update Products quantity
  private async executeUpdateProductsAmount(salesArray: ICreateSalesRegisterDTO[]) {
    await Promise.all(
      salesArray.map(async ({ productId, quantity }) => {
        const Q = 'UPDATE StoreManager.products SET quantity = quantity - ? WHERE id = ?';
        await connection.execute<ResultSetHeader>(Q, [quantity, productId]);
      }),
    );
  }
}
