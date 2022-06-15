import { Router } from 'express';

import { getAllController } from '../../services/products/integrations/GetAll-integration';
import { getByIdController } from '../../services/products/integrations/GetById-integration';

export const productsRoute = Router();

productsRoute.get('/products', async (_request, response) => {
  await getAllController.handle(_request, response);
});

productsRoute.get('/products/:id', async (request, response) => {
  await getByIdController.handle(request, response);
});
