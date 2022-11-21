import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import ticketService from "@/services/tickets-service";
import httpStatus from "http-status";

export async function getTicketByUser(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const ticketUser = await ticketService.getTicketByUser(userId);

    return res.status(httpStatus.FOUND).send(ticketUser);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);        
  }
}

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  try {
    const allTickets = await ticketService.getTickets();

    return res.status(httpStatus.FOUND).send(allTickets);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function postNewTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { ticketId } = req.body;
    
  try {
    const newTicket = await ticketService.createTicket(userId, ticketId);

    return res.status(httpStatus.CREATED).send(newTicket);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);        
  }
}
