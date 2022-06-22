import { Router } from 'express';

import { createController } from '../../domain/products/integrations/Create-integration';
import { getAllController } from '../../domain/products/integrations/GetAll-integration';
import { getByIdController } from '../../domain/products/integrations/GetById-integration';
import { updateController } from '../../domain/products/integrations/Update-integration';

export const productsRoute = Router();

productsRoute.get('/products', async (_request, response) => {
  await getAllController.handle(_request, response);
});

productsRoute.get('/products/:id', async (request, response) => {
  await getByIdController.handle(request, response);
});

productsRoute.post('/products', async (request, response) => {
  await createController.handle(request, response);
});

productsRoute.put('/products/:id', async (request, response) => {
  await updateController.handle(request, response);
});
