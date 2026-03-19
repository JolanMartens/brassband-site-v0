// app/contact/page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Ons",
  description: "Neem contact met ons op voor meer informatie.",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6">Contact</h1>
      <p className="text-muted-foreground">Contact page...</p>
    </div>
  );
}
