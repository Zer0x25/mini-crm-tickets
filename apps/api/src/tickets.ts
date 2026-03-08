import type {
  CreateTicketRequestDto,
  CreateTicketResponseDto,
  ListTicketsResponseDto,
  TicketStatus,
  TicketSummaryDto,
} from "@mini-crm/shared";
import { prisma } from "./prisma.js";

type TicketRecord = Awaited<ReturnType<typeof prisma.ticket.findMany>>[number];

const toTicketStatus = (status: string): TicketStatus => {
  if (status === "open") {
    return status;
  }

  throw new Error(`Unsupported ticket status in persistence: ${status}`);
};

const mapTicketRecordToDto = (record: TicketRecord): TicketSummaryDto => {
  return {
    id: record.id,
    title: record.title,
    status: toTicketStatus(record.status),
  };
};

const createTicketInputFromRequest = (request: CreateTicketRequestDto) => {
  if (typeof request.title !== "string") {
    throw new Error("Ticket title is required");
  }

  const title = request.title.trim();

  if (title.length === 0) {
    throw new Error("Ticket title is required");
  }

  return {
    id: crypto.randomUUID(),
    title,
    status: "open" as const,
  };
};

export const listTickets = async (): Promise<ListTicketsResponseDto> => {
  const records = await prisma.ticket.findMany({
    orderBy: {
      id: "asc",
    },
  });

  return {
    tickets: records.map(mapTicketRecordToDto),
  };
};

export const createTicket = async (
  request: CreateTicketRequestDto,
): Promise<CreateTicketResponseDto> => {
  const record = await prisma.ticket.create({
    data: createTicketInputFromRequest(request),
  });

  return {
    ticket: mapTicketRecordToDto(record),
  };
};
