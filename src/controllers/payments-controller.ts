import { Response } from 'express';
import httpStatus from 'http-status';
import paymentsService, { Card } from '@/services/payments-service';
import { AuthenticatedRequest } from '@/middlewares';

export async function getPayment(req: AuthenticatedRequest, res: Response) {
  const ticketId = Number(req.query.ticketId);
  const { userId } = req;
  if(!ticketId) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  try {
    const payment = await paymentsService.getPayment(userId,ticketId);
    
    if(!payment) {
     return res.sendStatus(httpStatus.NOT_FOUND);
    }

    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if(error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function createPayment(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    type paymentType = {
      ticketId: number,
      cardData: Card
    }

    const {
      ticketId,
      cardData
    } = req.body as paymentType;

    if(!ticketId) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }

    if(!cardData) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }

    const payment = await paymentsService.createPayment(ticketId, cardData, userId);

    if(!payment) {
     return res.sendStatus(httpStatus.NOT_FOUND);
    }

    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if(error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
