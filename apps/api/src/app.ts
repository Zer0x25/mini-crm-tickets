import Fastify from "fastify";
import cors from "@fastify/cors";
import type { ListTicketsResponseDto, TicketSummaryDto } from "@mini-crm/shared";

const app = Fastify({
  logger: true,
});

void app.register(cors, {
  origin: true,
});

const ticketRecords = [
  {
    id: "ticket-1",
    title: "Bootstrap public ticket contract",
  },
  {
    id: "ticket-2",
    title: "Render read-only ticket list in web",
  },
] as const;

const mapTicketRecordToDto = (record: (typeof ticketRecords)[number]): TicketSummaryDto => {
  return {
    id: record.id,
    title: record.title,
    status: "open",
  };
};

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

app.get("/tickets", async (): Promise<ListTicketsResponseDto> => {
  return {
    tickets: ticketRecords.map(mapTicketRecordToDto),
  };
});

export default app;
