// app/contact/page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallerij",
  description: "Bekijk onze foto's en video's.",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6">Gallerij</h1>
      <p className="text-muted-foreground">Gallerij page...</p>
    </div>
  );
}
