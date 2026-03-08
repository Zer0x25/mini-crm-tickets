import type { ListTicketsResponseDto, TicketStatus, TicketSummaryDto } from "@mini-crm/shared";
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
