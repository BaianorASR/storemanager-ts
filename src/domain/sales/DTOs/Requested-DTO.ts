export interface ICreateSalesRegisterDTO {
  productId: number;
  quantity: number;
}

export interface IRequestedSalesDTO {
  id: number;
  itemsSold: Array<ICreateSalesRegisterDTO>;
}
