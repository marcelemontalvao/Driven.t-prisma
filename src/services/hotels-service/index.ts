import hotelsRepository from '@/repositories/hotels-repository';

async function getAllHotels() {
  const hotels = await hotelsRepository.findAllHotels();
  return hotels;
}

const hotelsService = {
  getAllHotels,
};

export default hotelsService;
