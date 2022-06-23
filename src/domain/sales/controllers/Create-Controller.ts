import { Request, Response } from 'express';

import { CreateSalesUseCase } from '../useCases/Create-USeCase';

export class CreateSalesController {
  constructor(private useCase: CreateSalesUseCase) {}

  async handle(request: Request, response: Response) {
    const requestedSales = await this.useCase.execute(request.body);
    return response.status(201).json(requestedSales);
  }
}
