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

app.get("/tickets", async (_request, reply) => {
  try {
    return await listTickets();
  } catch (error) {
    app.log.error(error);
    return reply.code(500).send({
      message: "Internal server error",
    });
  }
});

app.post("/tickets", async (request, reply) => {
  const parsedPayload = createTicketRequestSchema.safeParse(request.body);
  if (!parsedPayload.success) {
    return reply.code(400).send({
      message: "Invalid request payload",
    });
  }

  try {
    const ticket = await createTicket(parsedPayload.data);
    return reply.code(201).send(ticket);
  } catch (error) {
    app.log.error(error);
    return reply.code(500).send({
      message: "Internal server error",
    });
  }
});

export default app;
