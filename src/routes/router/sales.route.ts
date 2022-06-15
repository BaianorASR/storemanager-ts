import { Router } from 'express';

import { getSalesAllController } from '../../services/sales/integrations/GetAll-integration';
import { getSalesByIdController } from '../../services/sales/integrations/GetById-integration';

export const salesRoute = Router();

salesRoute
  .get('/sales', async (_request, response) => {
    await getSalesAllController.handle(_request, response);
  })
  .get('/sales/:id', async (request, response) => {
    await getSalesByIdController.handle(request, response);
  });
