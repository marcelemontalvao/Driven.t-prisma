import { invalidDataError, notFoundError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import hotelsRepository from '@/repositories/hotels-repository';
import ticketsRepository from '@/repositories/tickets-repository';

async function getAllHotels(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw notFoundError();
  if (ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) throw invalidDataError([]);

  const hotels = await hotelsRepository.findAllHotels();
  return hotels;
}

const hotelsService = {
  getAllHotels,
};

export default hotelsService;
