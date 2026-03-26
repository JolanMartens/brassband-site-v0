import React from "react";
import { cn } from "@/lib/utils";

export type InfoCard = {
  id: string | number;
  title: string;
  description: string;
};

interface InfoGridProps {
  cards: InfoCard[];
}

export default function InfoGrid({ cards }: InfoGridProps) {
  return (
    <div className="container mx-auto py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, index) => {
          const isBig = index % 4 === 0 || index % 4 === 3;

          let bgClass = "bg-card";
          if (index % 4 === 1) bgClass = "bg-card-light";
          if (index % 4 === 2) bgClass = "bg-card-lighter";

          return (
            <div
              key={card.id}
              className={cn(
                "p-8 flex flex-col gap-4",
                isBig ? "md:col-span-2" : "md:col-span-1",
                bgClass,
              )}
            >
              <div className="flex flex-col items-start">
                <h3
                  className={cn(
                    "font-newsreader text-foreground mb-2",
                    isBig ? "text-3xl sm:text-4xl" : "text-2xl",
                  )}
                >
                  {card.title}
                </h3>
              </div>
              <p className={cn("text-gray-300", !isBig && "text-sm")}>
                {card.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
