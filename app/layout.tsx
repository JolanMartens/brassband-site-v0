import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Brassband Panta Rhei",
  description:
    "Brassband Panta Rhei is een brassband die zijn oorsprong heeft in Gent.",
};

// 2. Define your navigation data here once
const navLinks = [
  { title: "Home", href: "/" },
  { title: "Over Ons", href: "/over-ons" },
  { title: "Galerij", href: "/galerij" },
  { title: "Tickets", href: "/tickets" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
      )}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Navbar navigationData={navLinks} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
