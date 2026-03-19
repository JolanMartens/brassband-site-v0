import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-80px)]">
      <section className="relative flex-1 flex flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8 overflow-hidden">
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
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="mb-8 inline-flex items-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-1 text-sm font-medium text-white">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
            Concert op 15 juni in de Grote Kerk, Den Haag
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl max-w-4xl">
            Brassband <br className="hidden sm:block" />
            <span className="text-blue-500">Panta Rhei</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-200 sm:text-xl">
            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto">
            <Button
              asChild
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto text-md px-8"
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
              <Link href="/gallerij">Gallerij</Link>
            </Button>
          </div>
        </div>
      </section>
      <div className="bg-zinc-100 dark:bg-zinc-900 py-12 px-12">
        <h2 className="text-3xl font-bold mb-4">Panta Rhei</h2>
        <p>
          Brassband Panta Rhei is een orkest die zijn oorsprong heeft in Gent en
          is opgericht in samenwerking met de academie voor muziek, woord en
          dans te Gent.
        </p>
      </div>
    </div>
  );
}
