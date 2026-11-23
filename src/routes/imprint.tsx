import { createFileRoute } from "@tanstack/react-router";

/** Legal notice (Imprint) required by Digistore24 / German DDG §5. Keep the data below up to date. */
const LEGAL = {
  name: "Kayque Melo",
  business: "Time to Thrive (sole proprietor)",
  address: "Rua Dr. Francisco Sá Carneiro Nº 75, 2120-230 Foros de Salvaterra, Portugal",
  email: "kaiquepm0403@gmail.com",
  phone: "+351 966 979 710",
};

export const Route = createFileRoute("/imprint")({
  component: Imprint,
  head: () => ({
    meta: [
      { title: "Imprint / Legal Notice — Jesus Cristo App" },
      { name: "description", content: "Legal notice (Imprint): who operates this site, contact details, legal representation and content responsibility." },
      { property: "og:title", content: "Imprint / Legal Notice — Jesus Cristo App" },
      { property: "og:description", content: "Operator, contact details and legal information for this website." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function Imprint() {
  return (
    <div className="theme-sanctuary min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-2xl space-y-6 px-4 py-12 text-sm leading-relaxed">
        <h1 className="text-3xl font-bold text-primary">Imprint / Legal Notice</h1>
        <section><h2 className="text-lg font-bold">Who we are</h2>
          <p>{LEGAL.name}<br />{LEGAL.business}<br />{LEGAL.address}</p></section>
        <section><h2 className="text-lg font-bold">Contact</h2>
          <p>Email: <a className="underline" href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a><br />Phone: {LEGAL.phone}<br />Contact form: <a className="underline" href="/support">support page</a> (reply within 24 hours)</p></section>
        <section><h2 className="text-lg font-bold">Legal information</h2>
          <p>Sole proprietor. No commercial register entry. No VAT identification number (not applicable).</p></section>
        <section><h2 className="text-lg font-bold">Representation</h2><p>Legally represented by {LEGAL.name}.</p></section>
        <section><h2 className="text-lg font-bold">Responsible for content</h2><p>{LEGAL.name}, address as above.</p></section>
        <section><h2 className="text-lg font-bold">Retailer</h2>
          <p>Products are sold by Digistore24 as authorized retailer and merchant of record. 60-day money-back guarantee — see our <a className="underline" href="/refund">Refund Policy</a>.</p></section>
      </main>
    </div>
  );
}
