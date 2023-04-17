import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getPayment, createPayment } from '@/controllers';

const paymentsRouter = Router();

paymentsRouter
  .all('/*', authenticateToken)
  .get('/', getPayment)
  .post('/process', createPayment)

export { paymentsRouter };
