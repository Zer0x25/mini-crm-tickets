import Fastify from "fastify";
import cors from "@fastify/cors";
import { listTickets } from "./tickets.js";

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

export default app;
