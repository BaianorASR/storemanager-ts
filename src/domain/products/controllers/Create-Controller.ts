import { Request, Response } from 'express';

import { ICreateProductRequested } from '../repositories/Create-Repository';
import { CreateUseCase } from '../useCases/Create-USeCase';

export class CreateController {
  constructor(private useCase: CreateUseCase) {}

  async handle(request: Request, response: Response) {
    const bodyProduct = this.getProductFromBody(request);
    const product = await this.useCase.execute(bodyProduct);

    return response.status(201).json(product);
  }

  private getProductFromBody(request: Request): ICreateProductRequested {
    const { name, quantity } = request.body;

    return { name, quantity };
  }
}
