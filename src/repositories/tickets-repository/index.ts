import { prisma } from "@/config";
import { PrismaClientRustPanicError } from "@prisma/client/runtime";

async function findMany() {
  return prisma.ticketType.findMany();
}

async function findTickedByUser(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId,

    },
    include: {
      TicketType: true
    }
  });
}

async function findTickedById(id: number) {
  return prisma.ticketType.findFirst({
    where: {
      id
    }
  });
}

async function createNewTicket(ticketTypeId: number, enrollmentId: number) {
  return prisma.ticket.create({
    data: {
      ticketTypeId,
      enrollmentId,
      status: "RESERVED"
    },
    include: {
      TicketType: true,
    }
  });
}

async function ticketPaid(ticketId: number) {
  return prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: "PAID",
    }
  });
}

const ticketsRepository = {
  findMany,
  findTickedById,
  findTickedByUser,
  createNewTicket,
  ticketPaid
};

export default ticketsRepository;

