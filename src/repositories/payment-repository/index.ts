import { prisma } from '@/config';
import { Payment } from '@prisma/client';
import { type } from 'os';

async function findFirstPayment(ticketId: number) {
    return prisma.payment.findFirst({
        where: {
            ticketId,
        },
    });
};

async function createPayment(ticketId: number, cardData: PaymentCard) {
    return prisma.payment.create({
       data: {
        ticketId,
        ...cardData
       }
    });
};

export type PaymentCard = Omit<Payment, "id" | "createdAt" | "updatedAt">

const paymentRepository = {
    findFirstPayment,
    createPayment
};

export default paymentRepository;
