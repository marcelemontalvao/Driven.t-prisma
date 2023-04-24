import faker from '@faker-js/faker';
import { prisma } from '@/config';
import { Room } from '@prisma/client';

export async function createHotel(id: number, rooms: Room[]) {
    return prisma.hotel.create({
        data: {
            id,
            name: faker.name.findName(),
            image: faker.image.business(),
            rooms,
            createdAt: faker.date.past() ,
            updatedAt: faker.date.recent(),
        },
    });
}