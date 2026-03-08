import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import type { TicketSummaryDto } from "@mini-crm/shared";
import { createTicket, getTickets } from "./api/tickets";

function App() {
  const [tickets, setTickets] = useState<TicketSummaryDto[]>([]);
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submitErrorMessage, setSubmitErrorMessage] = useState<string | null>(null);

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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitErrorMessage(null);
    setIsSubmitting(true);

    try {
      const response = await createTicket({ title });
      setTickets((currentTickets) => [...currentTickets, response.ticket]);
      setTitle("");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unknown error while creating ticket";
      setSubmitErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Mini CRM Tickets</h1>
      <p>Public ticket read and create slice</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="ticket-title">Title</label>
        <input
          id="ticket-title"
          name="title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          disabled={isSubmitting}
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create ticket"}
        </button>
      </form>
      {submitErrorMessage ? <p>Unable to create ticket: {submitErrorMessage}</p> : null}
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
