"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type GalleryImageGridProps = {
  images: string[];
  eventTitle: string;
};

export function GalleryImageGrid({
  images,
  eventTitle,
}: GalleryImageGridProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const hasLightboxOpen = activeIndex !== null;

  useEffect(() => {
    if (!hasLightboxOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((prev) => {
          if (prev === null) return prev;
          return (prev - 1 + images.length) % images.length;
        });
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((prev) => {
          if (prev === null) return prev;
          return (prev + 1) % images.length;
        });
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [hasLightboxOpen, images.length]);

  useEffect(() => {
    if (activeIndex === null || images.length < 2) return;

    const previousIndex = (activeIndex - 1 + images.length) % images.length;
    const nextIndex = (activeIndex + 1) % images.length;
    const preloadTargets = [images[previousIndex], images[nextIndex]];

    preloadTargets.forEach((src) => {
      const preloadImage = new window.Image();
      preloadImage.src = src;
    });
  }, [activeIndex, images]);

  const goPrevious = () => {
    setActiveIndex((prev) => {
      if (prev === null) return prev;
      return (prev - 1 + images.length) % images.length;
    });
  };

  const goNext = () => {
    setActiveIndex((prev) => {
      if (prev === null) return prev;
      return (prev + 1) % images.length;
    });
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(event.changedTouches[0]?.clientX ?? null);
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX === null) return;

    const touchEndX = event.changedTouches[0]?.clientX;
    if (typeof touchEndX !== "number") return;

    const distance = touchEndX - touchStartX;
    const swipeThreshold = 50;

    if (distance > swipeThreshold) {
      goPrevious();
    } else if (distance < -swipeThreshold) {
      goNext();
    }

    setTouchStartX(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((src, index) => (
          <button
            key={src}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="overflow-hidden rounded-md border text-left transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <div className="relative h-72 p-2">
              <Image
                src={src}
                alt={`${eventTitle} foto ${index + 1}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={index < 3}
                loading={index < 3 ? "eager" : "lazy"}
                quality={75}
                className="rounded-sm object-contain p-2"
              />
            </div>
          </button>
        ))}
      </div>

      {activeIndex !== null ? (
        <div
          className="fixed inset-0 z-50 bg-black/85 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Fotogalerij van ${eventTitle}`}
          onClick={() => setActiveIndex(null)}
        >
          <button
            type="button"
            aria-label="Sluiten"
            className="absolute top-4 right-4 rounded-md border border-white/20 bg-black/50 p-2 text-white transition hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            onClick={() => setActiveIndex(null)}
          >
            <X className="size-5" />
          </button>

          <p className="absolute top-5 left-1/2 -translate-x-1/2 rounded-md border border-white/20 bg-black/50 px-3 py-1 text-sm text-white">
            {activeIndex + 1} / {images.length}
          </p>

          <button
            type="button"
            aria-label="Vorige foto"
            className="absolute top-1/2 left-4 -translate-y-1/2 rounded-md border border-white/20 bg-black/50 p-2 text-white transition hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            onClick={(event) => {
              event.stopPropagation();
              goPrevious();
            }}
          >
            <ChevronLeft className="size-6" />
          </button>

          <button
            type="button"
            aria-label="Volgende foto"
            className="absolute top-1/2 right-4 -translate-y-1/2 rounded-md border border-white/20 bg-black/50 p-2 text-white transition hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            onClick={(event) => {
              event.stopPropagation();
              goNext();
            }}
          >
            <ChevronRight className="size-6" />
          </button>

          <div
            className="flex h-full w-full items-center justify-center"
            onClick={(event) => event.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="flex w-full max-w-[94vw] flex-col items-center gap-4">
              <Image
                src={images[activeIndex]}
                alt={`${eventTitle} foto ${activeIndex + 1}`}
                width={1920}
                height={1280}
                sizes="94vw"
                priority
                quality={85}
                className="max-h-[75vh] w-auto max-w-full object-contain"
              />

              <div className="w-full overflow-x-auto pb-1">
                <div className="mx-auto flex w-max items-center gap-2">
                  {images.map((src, index) => (
                    <button
                      key={`${src}-thumb`}
                      type="button"
                      aria-label={`Ga naar foto ${index + 1}`}
                      onClick={() => setActiveIndex(index)}
                      className={`overflow-hidden rounded border transition ${
                        index === activeIndex
                          ? "border-white ring-2 ring-white/60"
                          : "border-white/20 opacity-80 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={src}
                        alt={`${eventTitle} thumbnail ${index + 1}`}
                        width={80}
                        height={56}
                        sizes="80px"
                        loading="lazy"
                        quality={60}
                        className="h-14 w-20 object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
