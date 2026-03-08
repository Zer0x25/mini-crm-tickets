import type {
  CreateTicketRequestDto,
  CreateTicketResponseDto,
  ListTicketsResponseDto,
} from "@mini-crm/shared";
import { config } from "../config";

export const getTickets = async (signal?: AbortSignal): Promise<ListTicketsResponseDto> => {
  const response = await fetch(`${config.apiBaseUrl}/tickets`, {
    signal,
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return (await response.json()) as ListTicketsResponseDto;
};

export const createTicket = async (
  payload: CreateTicketRequestDto,
): Promise<CreateTicketResponseDto> => {
  const response = await fetch(`${config.apiBaseUrl}/tickets`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;

    try {
      const errorBody = (await response.json()) as { message?: string };
      if (errorBody.message) {
        message = errorBody.message;
      }
    } catch {
      // Keep the default message when the response body is not JSON.
    }

    throw new Error(message);
  }

  return (await response.json()) as CreateTicketResponseDto;
};
