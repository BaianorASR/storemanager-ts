import { Request, Response } from 'express';

import { GetAllUseCase } from '../useCases/GetAll-UseCase';

export class GetAllController {
  constructor(private useCase: GetAllUseCase) {}

  async handle(_request: Request, response: Response) {
    const data = await this.useCase.execute();
    return response.status(200).json(data);
  }
}
