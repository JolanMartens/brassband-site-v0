import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import InfoGrid, { InfoCard } from "@/components/info-grid";

const homepageCards: InfoCard[] = [
  {
    id: 1,
    title: "Onvergetelijke Muziekervaringen",
    description:
      "Van klassieke meesterwerken tot moderne arrangementen, onze brassband brengt een breed scala aan muziek tot leven. Elk optreden is een unieke ervaring die je niet wilt missen.",
  },
  {
    id: 2,
    title: "Lorem Ipsum",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 3,
    title: "Lorem Ipsum",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 4,
    title: "Onze Historie",
    description:
      "Klein tekstje over de geschiedenis van Brassband Panta Rhei. Niet te lang, maar wel informatief en boeiend.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-80px)]">
      <section className="relative flex-1 flex flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8 overflow-hidden min-h-screen">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-small.jpg"
            alt="Brassband Panta Rhei Achtergrond"
            fill
            priority
            className="object-cover md:hidden"
            sizes="(max-width: 768px) 100vw, 0vw"
          />

          <Image
            src="/hero.jpg"
            alt="Brassband Panta Rhei Achtergrond"
            fill
            priority
            className="hidden object-cover md:block"
            sizes="100vw"
          />

          <div className="absolute inset-0 bg-black/60 dark:bg-black/70"></div>
          <div className="absolute inset-x-0 bottom-0 h-50 bg-gradient-to-t from-background to-transparent dark:from-gray-900 pointer-events-none"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="mb-8 inline-flex items-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-1 text-sm font-medium text-white">
            <span className="flex h-2 w-2 rounded-full mr-2 animate-pulse bg-blue-500"></span>
            Concert op 15 juni in de Grote Kerk, Den Haag
          </div>

          <h1 className="font-newsreader text-5xl font-extrabold text-white sm:text-8xl lg:text-9xl max-w-6xl">
            Brassband <br className="hidden sm:block" />
            <span className="text-primary">Panta Rhei</span>{" "}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-200 sm:text-xl">
            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto text-md px-8"
            >
              <Link href="/over-ons">
                Wie zijn wij?
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              asChild
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto text-md px-8"
            >
              <Link href="/galerij">Galerij</Link>
            </Button>
          </div>
        </div>
      </section>
      <div className="h-20"></div>
      <section className="py-6 px-12">
        <div className="container mx-auto">
          <div className="flex flex-col items-start py-6">
            <h2 className="font-newsreader text-4xl sm:text-5xl lg:text-6xl text-foreground mb-3">
              Wat We Doen
            </h2>
            <div className="h-1 w-24 bg-amber-500 rounded-sm"></div>
          </div>
          <InfoGrid cards={homepageCards} />
        </div>
      </section>
    </div>
  );
}
