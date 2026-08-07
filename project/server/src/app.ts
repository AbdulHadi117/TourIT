import express from 'express';
import cors from 'cors';
import { sendResponse } from './utils/response.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(cors());
app.use(express.json());

// Welcome / Root endpoint
app.get('/', (_req, res) => {
  return sendResponse(res, 200, true, 'API is running smoothly');
});

// Health check endpoint
app.get('/health', (_req, res) => {
  return sendResponse(res, 200, true, 'Server is healthy');
});
// Global Error Handler
app.use(errorHandler);

export default app;