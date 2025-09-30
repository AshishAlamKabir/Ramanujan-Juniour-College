import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import type { GalleryImage } from "@shared/schema";

export default function GalleryCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: images, isLoading } = useQuery<GalleryImage[]>({
    queryKey: ["/api/gallery"],
  });

  useEffect(() => {
    if (!images || images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images]);

  const goToPrevious = () => {
    if (!images || images.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    if (!images || images.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="w-full h-96 bg-muted animate-pulse rounded-lg"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-muted" data-testid="section-gallery">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center font-serif" data-testid="heading-gallery">
            Gallery
          </h2>

          <Card className="relative overflow-hidden bg-background">
            <div className="relative aspect-video w-full">
              {images[currentIndex].imageUrl ? (
                <img
                  src={images[currentIndex].imageUrl}
                  alt={images[currentIndex].caption || "Gallery image"}
                  className="w-full h-full object-cover"
                  data-testid={`img-gallery-${currentIndex}`}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-muted">
                  <ImageIcon className="w-20 h-20 text-muted-foreground" />
                </div>
              )}

              {images[currentIndex].caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4">
                  <p className="text-center text-lg" data-testid="text-gallery-caption">
                    {images[currentIndex].caption}
                  </p>
                </div>
              )}

              {images.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                    onClick={goToPrevious}
                    data-testid="button-gallery-prev"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>

                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                    onClick={goToNext}
                    data-testid="button-gallery-next"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex justify-center gap-2 p-4">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentIndex ? "bg-primary" : "bg-muted-foreground/30"
                    }`}
                    data-testid={`button-gallery-dot-${index}`}
                  />
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
}
