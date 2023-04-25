import { Ticket, TicketStatus, TicketType } from '@prisma/client';
import { invalidTicketError, notFoundError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepository from '@/repositories/tickets-repository';
import { CreateTicketParams } from '@/protocols';

async function getTicketType(): Promise<TicketType[]> {
  const ticketTypes: TicketType[] = await ticketsRepository.findTicketTypes();
  if (!ticketTypes) throw notFoundError();

  return ticketTypes;
}

async function getTicketByUserId(userId: number): Promise<Ticket> {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw notFoundError();

  return ticket;
}

async function createTicket(userId: number, ticketTypeId: number): Promise<Ticket> {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticketData: CreateTicketParams = {
    ticketTypeId,
    enrollmentId: enrollment.id,
    status: TicketStatus.RESERVED,
  };

  await ticketsRepository.createTicket(ticketData);

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);

  return ticket;
}

async function getTicketTypeByUserId(userId: number): Promise<Ticket> {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw notFoundError();

  const ticketType = await ticketsRepository.findTickeWithTypeById(ticket.id);
  if (!ticketType.TicketType.includesHotel || ticketType.TicketType.isRemote || ticket.enrollmentId === null)
    throw invalidTicketError();

  return ticketType;
}

const ticketService = { getTicketType, getTicketByUserId, createTicket, getTicketTypeByUserId };

export default ticketService;
