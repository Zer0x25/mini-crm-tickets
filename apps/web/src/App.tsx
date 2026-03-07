import { useEffect, useState } from "react";
import type { TicketSummaryDto } from "@mini-crm/shared";
import { getTickets } from "./api/tickets";

function App() {
  const [tickets, setTickets] = useState<TicketSummaryDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadTickets = async () => {
      try {
        const data = await getTickets(controller.signal);
        setTickets(data.tickets);
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        const message =
          error instanceof Error ? error.message : "Unknown error while loading tickets";
        setErrorMessage(message);
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    void loadTickets();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div>
      <h1>Mini CRM Tickets</h1>
      <p>Read-only public ticket slice</p>
      {isLoading ? <p>Loading tickets...</p> : null}
      {errorMessage ? <p>Unable to load tickets: {errorMessage}</p> : null}
      {!isLoading && !errorMessage ? (
        <ul>
          {tickets.map((ticket) => (
            <li key={ticket.id}>
              <strong>{ticket.title}</strong> ({ticket.status})
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default App;
