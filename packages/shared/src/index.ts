export type TicketStatus = "open";

export interface TicketSummaryDto {
  id: string;
  title: string;
  status: TicketStatus;
}

export interface ListTicketsResponseDto {
  tickets: TicketSummaryDto[];
}
