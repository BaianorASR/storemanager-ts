import { Router } from 'express';

import { createSalesController } from '../../domain/sales/integrations/Create-Integration';
import { getSalesAllController } from '../../domain/sales/integrations/GetAll-integration';
import { getSalesByIdController } from '../../domain/sales/integrations/GetById-integration';

export const salesRoute = Router();

salesRoute
  .get('/sales', async (_request, response) => {
    await getSalesAllController.handle(_request, response);
  })
  .get('/sales/:id', async (request, response) => {
    await getSalesByIdController.handle(request, response);
  });

salesRoute.post('/sales', async (request, response) => {
  await createSalesController.handle(request, response);
});
