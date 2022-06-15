import connection from '../../../configs/mysql2';
import { IProductsEntityDTO } from '../DTOs/Product-DTO';
import { IGetAllRepository } from '../repositories/GetAll-Repository';

export class GetAllImplementation implements IGetAllRepository {
  async getAll(): Promise<IProductsEntityDTO[]> {
    const Q = 'SELECT * FROM products';

    const [result] = await connection.execute(Q);

    return result as IProductsEntityDTO[];
  }
}
