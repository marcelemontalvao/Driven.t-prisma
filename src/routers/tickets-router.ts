import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getTickets, getAllTicketTypes, createTicket } from '@/controllers';

const ticketsRouter = Router();

ticketsRouter
  .all('/*', authenticateToken)
  .get('/types', getAllTicketTypes)
  .get('', getTickets)
  .post('', createTicket)

export { ticketsRouter };
