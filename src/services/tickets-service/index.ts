import ticketsRepository from "@/repositories/tickets-repository";
import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";

async function getTickets() {
  const ticket = await ticketsRepository.findMany();
  if(!ticket) throw notFoundError();
  return ticket;
}

async function getTicketByUser(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  const oneTicket = await ticketsRepository.findTickedByUser(enrollment.id);
  if(!oneTicket) throw notFoundError();
  return oneTicket;
}

async function createTicket(userId: number, ticketTypeId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  const newTicket = await ticketsRepository.createNewTicket(ticketTypeId, enrollment.id);
  return newTicket;
}

async function getTicketById(ticketId: number) {
  const ticket = await ticketsRepository.findTickedById(ticketId);
  return ticket;
}

async function updateStatus(ticketId: number) {
  const ticketStatus = await ticketsRepository.ticketPaid(ticketId);
  return ticketStatus;
}

const ticketService = {
  getTickets, getTicketByUser, createTicket, getTicketById, updateStatus
};

export default ticketService;
