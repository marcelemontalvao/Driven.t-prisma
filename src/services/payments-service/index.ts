import { notFoundError, unauthorizedError } from "@/errors";
import paymentRepository from "@/repositories/payment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { PaymentCard } from "@/repositories/payment-repository";

async function getPayment(userId: number, ticketId: number) {
    const ticket = await ticketRepository.findTicketById(ticketId);

    if(!ticket) {
        throw notFoundError();
    }

    if(ticket.Enrollment.userId !== userId) {
        throw unauthorizedError();
    }

    const payment = await paymentRepository.findFirstPayment(ticketId);

    if(!payment) {
        throw notFoundError();
    }
   
    return payment;
}



export type Card = {
    issuer: string,
    number: number,
    name: string,
    expirationDate: Date,
    cvv: number
}

async function createPayment(ticketId: number, cardData: Card, userId: number) {

    const ticketT = await ticketRepository.findTicketTById(ticketId);
    const ticket = await ticketRepository.findTicketById(ticketId);

    if(ticket.Enrollment.userId !== userId) {
        throw unauthorizedError();
    }
    
    const data = {
        ticketId,
        value: ticketT.TicketType.price,
        cardIssuer: cardData.issuer,
        cardLastDigits: cardData.number.toString().slice(-4),  
    } as PaymentCard;

    const payment = await paymentRepository.createPayment(ticketId, data);
    await ticketRepository.ticketPayment(ticketId);

    return payment;
}

const paymentsService = {
    getPayment,
    createPayment
};

export default paymentsService;
