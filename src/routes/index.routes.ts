import 'express-async-errors';

import { Router } from 'express';

import ErrorMiddleware from '../error/middleware';
import { productsRoute } from './router/products.route';
import { salesRoute } from './router/sales.route';

export const indexRoute = Router();

indexRoute.use(productsRoute);
indexRoute.use(salesRoute);

indexRoute.use(ErrorMiddleware);
