import { useState } from "react";
import { Share2, Heart, ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  images: string[];
  status: string;
};

export function PropertyGallery({ images, status }: Props) {
  const [active, setActive] = useState(0);
  const [saved, setSaved] = useState(false);

  const prev = () => setActive((a) => (a === 0 ? images.length - 1 : a - 1));
  const next = () => setActive((a) => (a === images.length - 1 ? 0 : a + 1));

  return (
    <div>
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-luxury">
        <span className="absolute left-4 top-4 z-10 rounded-md border border-border bg-background/60 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-foreground backdrop-blur">
          {status}
        </span>
        <div className="absolute right-4 top-4 z-10 flex gap-2">
          <button
            aria-label="Share"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/60 text-foreground backdrop-blur transition-colors hover:border-primary hover:text-primary"
          >
            <Share2 className="h-4 w-4" />
          </button>
          <button
            aria-label="Save"
            onClick={() => setSaved(!saved)}
            className={`flex h-10 w-10 items-center justify-center rounded-full border bg-background/60 backdrop-blur transition-colors ${
              saved
                ? "border-primary text-primary"
                : "border-border text-foreground hover:border-primary hover:text-primary"
            }`}
          >
            <Heart className={`h-4 w-4 ${saved ? "fill-primary" : ""}`} />
          </button>
        </div>

        <img
          src={images[active]}
          alt="Property"
          className="aspect-[16/10] w-full object-cover"
          width={1600}
          height={1000}
        />

        <button
          onClick={prev}
          aria-label="Previous"
          className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/60 text-foreground backdrop-blur transition-colors hover:border-primary hover:text-primary"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={next}
          aria-label="Next"
          className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/60 text-foreground backdrop-blur transition-colors hover:border-primary hover:text-primary"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-4 grid grid-cols-5 gap-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`overflow-hidden rounded-lg border transition-all ${
              active === i
                ? "border-primary ring-2 ring-primary/30"
                : "border-border opacity-70 hover:opacity-100"
            }`}
          >
            <img
              src={img}
              alt={`Thumb ${i + 1}`}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
