import ticketsRepository from "@/repositories/tickets-repository";
import { notFoundError } from "@/errors";

async function getTickets() {
  const ticket = await ticketsRepository.findMany();
  if(!ticket) throw notFoundError();
  return ticket;
}

async function getTicketByUser(userId: number) {
  const oneTicket = await ticketsRepository.findTickedByUser(userId);
  if(!oneTicket) throw notFoundError();
  return oneTicket;
}

async function createTicket(ticketTypeId: number, enrollmentId: number) {
  const newTicket = await ticketsRepository.createNewTicket(ticketTypeId, enrollmentId);
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
