import { ApplicationError } from '@/protocols';

export function invalidTicketError(): ApplicationError {
  return {
    name: 'invalidTicketError',
    message: 'This ticket is remote or does not includes a hotel!',
  };
}
