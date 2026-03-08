export type TicketStatus = "open";

export interface CreateTicketRequestDto {
  title: string;
}

export interface TicketSummaryDto {
  id: string;
  title: string;
  status: TicketStatus;
}

export interface CreateTicketResponseDto {
  ticket: TicketSummaryDto;
}

export interface ListTicketsResponseDto {
  tickets: TicketSummaryDto[];
}
