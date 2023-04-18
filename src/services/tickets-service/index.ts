import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { TicketStatus } from "@prisma/client";

async function getAllTicketTypes() {
    const ticketTypes = await ticketRepository.findManyTicketsType();

    if(!ticketTypes) {
        throw notFoundError();
    }

    return ticketTypes;
}

async function getTicket(userId: number) {
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
    if(!enrollment) {
        throw notFoundError();
    }

    const ticket = await ticketRepository.findFirstTicket(enrollment.id);

    if(!ticket) {
        throw notFoundError();
    }

    return ticket;
}

async function createTicket(userId: number, ticketTypeId: number) {
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

    if(!enrollment) {
        throw notFoundError();
    }

    const newTicket = {
        ticketTypeId,
        enrollmentId: enrollment.id,
        status: TicketStatus.RESERVED
    }

    await ticketRepository.createTicket(newTicket);
    const ticket = await ticketRepository.findFirstTicket(enrollment.id);

    return ticket;
}

const ticketsService = {
    getAllTicketTypes,
    getTicket,
    createTicket
};

export default ticketsService;
