import type { ResultSetHeader } from 'mysql2';

import connection from '../../../configs/mysql2';
import AppError from '../../../error/appError';
import type { IDeleteRepository } from '../repositories/Delete-Repository';

export class DeleteImplementation implements IDeleteRepository {
  async delete(id: string): Promise<void> {
    const Q = 'DELETE FROM products WHERE id = ?';

    const [result] = await connection.execute<ResultSetHeader>(Q, [id]);

    if (result.affectedRows === 0) {
      throw new AppError(404, 'Product not found');
    }
  }
}
