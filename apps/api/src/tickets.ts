import {
  createTicketResponseSchema,
  CreateTicketRequestDto,
  CreateTicketResponseDto,
  listTicketsResponseSchema,
  ListTicketsResponseDto,
  ticketStatusSchema,
  ticketSummarySchema,
} from "@mini-crm/shared";
import { prisma } from "./prisma.js";

type TicketRecord = Awaited<ReturnType<typeof prisma.ticket.findMany>>[number];

const mapTicketRecordToDto = (record: TicketRecord) => {
  return {
    id: record.id,
    title: record.title,
    status: ticketStatusSchema.parse(record.status),
  };
};

const createTicketInputFromRequest = (request: CreateTicketRequestDto) => {
  return {
    id: crypto.randomUUID(),
    title: request.title,
    status: "open" as const,
  };
};

export const listTickets = async (): Promise<ListTicketsResponseDto> => {
  const records = await prisma.ticket.findMany({
    orderBy: {
      id: "asc",
    },
  });

  return listTicketsResponseSchema.parse({
    tickets: records.map((record) => ticketSummarySchema.parse(mapTicketRecordToDto(record))),
  });
};

export const createTicket = async (
  request: CreateTicketRequestDto,
): Promise<CreateTicketResponseDto> => {
  const record = await prisma.ticket.create({
    data: createTicketInputFromRequest(request),
  });

  return createTicketResponseSchema.parse({
    ticket: ticketSummarySchema.parse(mapTicketRecordToDto(record)),
  });
};
