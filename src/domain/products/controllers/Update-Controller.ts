import type { Request, Response } from 'express';

import type { IUpdateProductRequested } from '../repositories/Update-Repository';
import { UpdateUseCase } from '../useCases/Update-UseCase';

export class UpdateController {
  constructor(private readonly useCase: UpdateUseCase) {}

  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const bodyProduct = this.getProductFromBody(request);
    const product = await this.useCase.execute(id, bodyProduct);

    return response.status(200).json(product);
  }

  private getProductFromBody(request: Request): IUpdateProductRequested {
    const { name, quantity } = request.body;

    return { name, quantity };
  }
}
