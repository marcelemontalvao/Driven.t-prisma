import { notFoundError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import hotelsRepository from '@/repositories/hotels-repository';
import ticketsRepository from '@/repositories/tickets-repository';
import enrollmentsService from '../enrollments-service';
import ticketService from '../tickets-service';
import ticketsService from '../tickets-service';

async function getAllHotels(userId: number) {
  const ticket = await ticketsService.getTicketByUserId(userId);
  if (!ticket) throw notFoundError();

  const hotels = await hotelsRepository.findAllHotels();
  return hotels;
}

async function getHotelById(id: number, userId: number) {
  const ticket = await ticketService.getTicketByUserId(userId);
  if (!ticket) throw notFoundError();

  const hotel = await hotelsRepository.findHotelById(id);
  return hotel;
}

const hotelsService = {
  getAllHotels,
  getHotelById,
};

export default hotelsService;
