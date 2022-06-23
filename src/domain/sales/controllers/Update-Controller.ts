import { Request, Response } from 'express';

import { UpdateSalesUseCase } from '../useCases/Update-UseCase';

export class UpdateSalesController {
  constructor(private useCase: UpdateSalesUseCase) {}

  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const salesUpdatedInfo = await this.useCase.execute(id, request.body);
    return response.status(200).json(salesUpdatedInfo);
  }
}
