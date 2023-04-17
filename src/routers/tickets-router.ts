import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getTickets, getTicketTypes, createTicket } from '@/controllers';

const ticketsRouter = Router();

ticketsRouter
  .all('/*', authenticateToken)
  .get('/types', getTicketTypes)
  .get('', getTickets)
  .post('', createTicket)

export { ticketsRouter };
