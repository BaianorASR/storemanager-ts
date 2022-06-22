import { Request, Response } from 'express';

import { GetByIdUseCase } from '../useCases/GetById-UseCase';

export class GetByIdController {
  constructor(private readonly useCase: GetByIdUseCase) {}

  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const data = await this.useCase.execute(Number(id));
    return response.status(200).json(data);
  }
}
