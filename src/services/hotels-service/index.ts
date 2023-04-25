import { notFoundError } from '@/errors';
import hotelsRepository from '@/repositories/hotels-repository';
import ticketsService from '../tickets-service';

async function getAllHotels(userId: number) {
  const ticket = await ticketsService.getTicketByUserId(userId);
  if (!ticket) throw notFoundError();

  const hotels = await hotelsRepository.findAllHotels();
  return hotels;
}

const hotelsService = {
  getAllHotels,
};

export default hotelsService;
