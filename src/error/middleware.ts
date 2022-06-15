/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';

import AppError from './appError';

export default function ErrorMiddleware(
  err: Error,
  _request: Request,
  response: Response,
  _next: NextFunction,
) {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({ message: err.message });
  }

  return response.status(500).json({
    status: 'error',
    message: `Internal Server Error! - ${err.message}`,
  });
}
