import type { ListTicketsResponseDto } from "@mini-crm/shared";
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
