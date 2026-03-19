// app/contact/page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Over Ons",
  description: "Meer informatie over Brassband Panta Rhei.",
};

export default function OverOnsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6">Over Ons</h1>
      <p className="text-muted-foreground">Over ons page...</p>
    </div>
  );
}
