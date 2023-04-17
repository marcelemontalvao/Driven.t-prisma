import { prisma } from '@/config';
import { Ticket, TicketStatus } from '@prisma/client';

async function findManyTicketsType() {
  return prisma.ticketType.findMany();
};

async function findFirstTicket(enrollmentId: number) {
    return prisma.ticket.findFirst({
        where: {
            enrollmentId,
        },
        include: {
            TicketType: true,
        }
    });
};

async function createTicket(newTicket: any) {
    return prisma.ticket.create({
        data: {
            ...newTicket,
        },
        include: {
            TicketType: true,
        }
    });
};

async function findTicketById(ticketId: number) {
    return prisma.ticket.findFirst({
        where: {
            id: ticketId,
        },
        include: {
            Enrollment: true
        }
    });
};

async function findTicketTById(ticketId: number) {
    return prisma.ticket.findFirst({
        where: {
            id: ticketId,
        },
        include: {
            TicketType: true
        }
    });
};

async function ticketPayment(ticketId: number) {
    return prisma.ticket.update({
        where: {
            id: ticketId,
        },
        data: {
            status: TicketStatus.PAID
        }
    })    
};

const ticketRepository = {
    findManyTicketsType,
    findFirstTicket,
    createTicket,
    findTicketById,
    findTicketTById,
    ticketPayment
};

export default ticketRepository;
