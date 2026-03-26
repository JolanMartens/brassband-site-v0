// app/contact/page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galerij",
  description: "Bekijk onze foto's en video's.",
};

export default function GallerijPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6">Galerij</h1>
      <p className="text-muted-foreground">Galerij page...</p>
    </div>
  );
}
