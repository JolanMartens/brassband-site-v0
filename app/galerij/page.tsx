import { Metadata } from "next"
import fs from "node:fs/promises"
import path from "node:path"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: "Galerij",
  description: "Bekijk onze foto's en video's per evenement.",
}

const MEDIA_EXTENSIONS = {
  images: new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]),
  videos: new Set([".mp4", ".webm", ".mov", ".m4v"]),
}

type EventJson = {
  title?: string
  date?: string
  location?: string
  description?: string
}

type GalleryEvent = {
  slug: string
  title: string
  date: string
  location?: string
  description?: string
  images: string[]
  videos: string[]
}

function formatDate(value: string): string {
  const parsed = new Date(value)
  if (Number.isNaN(parsed.valueOf())) return value
  return new Intl.DateTimeFormat("nl-BE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(parsed)
}

async function getFilesByType(
  absoluteDir: string,
  publicBasePath: string,
  extensions: Set<string>
): Promise<string[]> {
  try {
    const files = await fs.readdir(absoluteDir, { withFileTypes: true })
    return files
      .filter((file) => file.isFile())
      .map((file) => file.name)
      .filter((name) => extensions.has(path.extname(name).toLowerCase()))
      .sort()
      .map((name) => `${publicBasePath}/${name}`)
  } catch {
    return []
  }
}

async function getGalleryEvents(): Promise<GalleryEvent[]> {
  const galleryRoot = path.join(process.cwd(), "public", "galerij")

  try {
    const entries = await fs.readdir(galleryRoot, { withFileTypes: true })
    const folderEntries = entries.filter((entry) => entry.isDirectory())

    const events = await Promise.all(
      folderEntries.map(async (entry): Promise<GalleryEvent> => {
        const slug = entry.name
        const eventRoot = path.join(galleryRoot, slug)
        const publicEventRoot = `/galerij/${slug}`

        let eventJson: EventJson = {}
        try {
          const raw = await fs.readFile(path.join(eventRoot, "event.json"), "utf-8")
          eventJson = JSON.parse(raw) as EventJson
        } catch {
          eventJson = {}
        }

        const images = await getFilesByType(
          path.join(eventRoot, "images"),
          `${publicEventRoot}/images`,
          MEDIA_EXTENSIONS.images
        )

        const videos = await getFilesByType(
          path.join(eventRoot, "videos"),
          `${publicEventRoot}/videos`,
          MEDIA_EXTENSIONS.videos
        )

        return {
          slug,
          title: eventJson.title ?? slug,
          date: eventJson.date ?? slug.slice(0, 10),
          location: eventJson.location,
          description: eventJson.description,
          images,
          videos,
        }
      })
    )

    return events.sort((a, b) => b.slug.localeCompare(a.slug))
  } catch {
    return []
  }
}

export default async function GallerijPage() {
  const events = await getGalleryEvents()

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-4 text-5xl font-bold font-newsreader md:text-6xl">Galerij</h1>
      <p className="mb-8 text-muted-foreground">
        Bekijk foto&apos;s en video&apos;s per evenement. Voeg nieuwe events toe in{" "}
        <code>public/galerij</code> met een <code>event.json</code>, <code>images</code>{" "}
        en <code>videos</code> map.
      </p>

      {events.length === 0 ? (
        <p className="rounded-md border border-dashed p-6 text-sm text-muted-foreground">
          Nog geen evenementen gevonden in <code>public/galerij</code>.
        </p>
      ) : (
        <Accordion type="single" collapsible className="w-full">
          {events.map((event) => (
            <AccordionItem key={event.slug} value={event.slug}>
              <AccordionTrigger className="text-left">
                <div>
                  <p className="font-semibold">{event.title}</p>
                  <p className="text-sm font-normal text-muted-foreground">
                    {formatDate(event.date)}
                    {event.location ? ` - ${event.location}` : ""}
                  </p>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-8">
                  {event.description ? (
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                  ) : null}

                  <section className="space-y-4">
                    <h2 className="text-xl font-semibold">Foto&apos;s</h2>
                    {event.images.length === 0 ? (
                      <p className="text-sm text-muted-foreground">
                        Geen foto&apos;s gevonden.
                      </p>
                    ) : (
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {event.images.map((src) => (
                          <img
                            key={src}
                            src={src}
                            alt={`${event.title} foto`}
                            loading="lazy"
                            className="aspect-[4/3] w-full rounded-md border object-cover"
                          />
                        ))}
                      </div>
                    )}
                  </section>

                  <section className="space-y-4">
                    <h2 className="text-xl font-semibold">Video&apos;s</h2>
                    {event.videos.length === 0 ? (
                      <p className="text-sm text-muted-foreground">
                        Geen video&apos;s gevonden.
                      </p>
                    ) : (
                      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        {event.videos.map((src) => (
                          <video
                            key={src}
                            controls
                            preload="metadata"
                            className="w-full rounded-md border bg-black"
                          >
                            <source src={src} />
                            Je browser ondersteunt deze video niet.
                          </video>
                        ))}
                      </div>
                    )}
                  </section>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  )
}
