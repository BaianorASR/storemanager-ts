import { Request, Response } from 'express';

import { DeleteSalesUseCase } from '../useCases/Delete-UseCase';

export class DeleteSalesController {
  constructor(private useCase: DeleteSalesUseCase) {}

  async handle(request: Request, response: Response) {
    await this.useCase.execute(request.params.id);
    return response.status(204).end();
  }
}
