export interface IDeleteSaleRepository {
  delete(id: string): Promise<void>;
}
