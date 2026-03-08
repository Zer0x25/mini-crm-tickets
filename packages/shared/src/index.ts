import { z } from "zod";

export const ticketStatusSchema = z.literal("open");

export const createTicketRequestSchema = z.object({
  title: z.string().trim().min(1, "Ticket title is required"),
});

export const ticketSummarySchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  status: ticketStatusSchema,
});

export const createTicketResponseSchema = z.object({
  ticket: ticketSummarySchema,
});

export const listTicketsResponseSchema = z.object({
  tickets: z.array(ticketSummarySchema),
});

export type TicketStatus = z.infer<typeof ticketStatusSchema>;

export type CreateTicketRequestDto = z.infer<typeof createTicketRequestSchema>;

export type TicketSummaryDto = z.infer<typeof ticketSummarySchema>;

export type CreateTicketResponseDto = z.infer<typeof createTicketResponseSchema>;

export type ListTicketsResponseDto = z.infer<typeof listTicketsResponseSchema>;
