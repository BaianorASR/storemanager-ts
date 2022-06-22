import { Request, Response } from 'express';

import { DeleteUseCase } from '../useCases/Delete-UseCase';

export class DeleteController {
  constructor(private readonly useCase: DeleteUseCase) {}

  public async handle(request: Request, response: Response) {
    const { id } = request.params;
    await this.useCase.execute(id);
    return response.status(204).end();
  }
}
