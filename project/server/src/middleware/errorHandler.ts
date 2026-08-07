import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../utils/response.js';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error('🔥 Error:', err.stack || err.message);
  return sendResponse(res, 500, false, err.message || 'Internal Server Error');
};