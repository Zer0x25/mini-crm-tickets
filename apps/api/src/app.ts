import Fastify from "fastify";
import cors from "@fastify/cors";
import { createTicket, listTickets } from "./tickets.js";
import { createTicketRequestSchema } from "@mini-crm/shared";

const app = Fastify({
  logger: true,
});

const corsOrigin = process.env.CORS_ORIGIN ?? `http://localhost:${process.env.WEB_PORT ?? 3000}`;

void app.register(cors, {
  origin: corsOrigin,
});

app.get("/health", async () => {
  return {
    status: "ok",
    timestamp: new Date().toISOString(),
  };
});

app.get("/", async () => {
  return {
    message: "Mini CRM Tickets API - implementation pending",
  };
});

app.get("/tickets", async () => {
  return listTickets();
});

app.post("/tickets", async (request, reply) => {
  try {
    const payload = createTicketRequestSchema.parse(request.body);
    const ticket = await createTicket(payload);
    return reply.code(201).send(ticket);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid ticket payload";
    return reply.code(400).send({ message });
  }
});

export default app;
