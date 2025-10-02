import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

import image1 from "@assets/Screenshot 2025-10-02 162408_1759402604596.png";
import image2 from "@assets/Screenshot 2025-10-02 162348_1759402604596.png";
import image3 from "@assets/Screenshot 2025-10-02 162333_1759402604597.png";
import image4 from "@assets/Screenshot 2025-10-02 162306_1759402604597.png";
import image5 from "@assets/Screenshot 2025-10-02 162244_1759402604598.png";
import image6 from "@assets/Screenshot 2025-10-02 162227_1759402604599.png";
import image7 from "@assets/Screenshot 2025-10-02 162213_1759402604599.png";
import image8 from "@assets/Screenshot 2025-10-02 162156_1759402604600.png";
import image9 from "@assets/Screenshot 2025-10-02 162139_1759402604600.png";
import image10 from "@assets/Screenshot 2025-10-02 162125_1759402604601.png";
import image11 from "@assets/Screenshot 2025-10-02 162110_1759402604601.png";
import image12 from "@assets/Screenshot 2025-10-02 162054_1759402604602.png";
import image13 from "@assets/Screenshot 2025-10-02 162041_1759402604602.png";
import image14 from "@assets/Screenshot 2025-10-02 162030_1759402604605.png";
import image15 from "@assets/Screenshot 2025-10-02 162016_1759402604606.png";
import image16 from "@assets/Screenshot 2025-10-02 161959_1759402604607.png";
import image17 from "@assets/Screenshot 2025-10-02 162016_1759402604606.png";

const collegeImages = [
  { src: image1, caption: "College Achievement Event" },
  { src: image2, caption: "Student Celebrations" },
  { src: image3, caption: "Award Ceremony" },
  { src: image4, caption: "Student Success" },
  { src: image5, caption: "College Event" },
  { src: image6, caption: "Academic Event" },
  { src: image7, caption: "Cultural Program" },
  { src: image8, caption: "Student Achievement" },
  { src: image9, caption: "Award Presentation" },
  { src: image10, caption: "Trophy Presentation" },
  { src: image11, caption: "Student Celebration" },
  { src: image12, caption: "Award Event" },
  { src: image13, caption: "College Milestone" },
  { src: image14, caption: "Recognition Ceremony" },
  { src: image15, caption: "Student Victory" },
  { src: image16, caption: "Success Celebration" },
  { src: image17, caption: "Achievement Moment" },
];

export default function EventsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % collegeImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + collegeImages.length) % collegeImages.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % collegeImages.length);
  };

  return (
    <section className="py-12 bg-background" data-testid="section-events-carousel">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center font-serif" data-testid="heading-events-carousel">
            College Achievements & Events
          </h2>

          <Card className="relative overflow-hidden bg-background shadow-lg">
            <div className="relative aspect-video w-full bg-muted">
              <img
                src={collegeImages[currentIndex].src}
                alt={collegeImages[currentIndex].caption}
                className="w-full h-full object-cover"
                data-testid={`img-event-${currentIndex}`}
              />

              {collegeImages[currentIndex].caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-6">
                  <p className="text-center text-lg font-medium" data-testid="text-event-caption">
                    {collegeImages[currentIndex].caption}
                  </p>
                </div>
              )}

              <Button
                variant="outline"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
                onClick={goToPrevious}
                data-testid="button-event-prev"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
                onClick={goToNext}
                data-testid="button-event-next"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>

            <div className="flex justify-center gap-2 p-4 flex-wrap">
              {collegeImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex 
                      ? "bg-primary scale-110" 
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  data-testid={`button-event-dot-${index}`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
