export interface ISalesEntityDTO {
  saleId: number;
  date: Date;
  productId: number;
  quantity: number;
}

export interface ISalesByIdDTO {
  date: Date;
  productId: number;
  quantity: number;
}
