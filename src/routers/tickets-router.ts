import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getTicketByUser, getTickets, postNewTicket } from "@/controllers/tickets-controller";

const ticketRouter = Router();

ticketRouter
  .all("/*", authenticateToken)
  .get("/", getTickets)
  .get("/types", getTicketByUser)
  .post("/", postNewTicket);

export { ticketRouter };

