import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tickets",
  description: "Koop tickets voor onze aankomende evenementen.",
};

const EXAMPLE_TICKET_URL = "https://tickets.example.com/panta-rhei";

export default function TicketsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6">Tickets</h1>
      <p className="text-muted-foreground mb-10">
        Koop hier je tickets voor onze komende concerten en evenementen.
      </p>

      <div className="grid gap-8 md:grid-cols-2">
        <section className="rounded-lg border p-6">
          <h2 className="text-2xl font-semibold mb-3">
            Voorbeeld: tickets beschikbaar
          </h2>
          <p className="text-muted-foreground mb-5">
            Er zijn tickets beschikbaar voor een aankomend evenement.
          </p>
          <a
            href={EXAMPLE_TICKET_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-primary-foreground hover:opacity-90 transition"
          >
            Koop tickets
          </a>
        </section>

        <section className="rounded-lg border p-6">
          <h2 className="text-2xl font-semibold mb-3">
            Voorbeeld: geen komende evenementen
          </h2>
          <p className="text-muted-foreground">
            Er staan momenteel geen evenementen gepland. Kom later terug voor
            nieuwe concertdata en ticketverkoop.
          </p>
        </section>
      </div>
    </div>
  );
}
