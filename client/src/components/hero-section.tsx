import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="hero-bg text-white relative overflow-hidden">
      {/* Campus background image with overlay */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="relative container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* College Branding */}
          <div className="mb-6">
            <Badge className="inline-flex items-center bg-accent text-accent-foreground px-4 py-2 rounded-full font-semibold mb-4 hover:bg-accent/90" data-testid="naac-badge">
              <Star className="w-4 h-4 mr-2" />
              NAAC A++ Grade
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 font-serif" data-testid="college-name">
              Ramanujan College
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-2" data-testid="university-affiliation">University of Delhi</p>
            <p className="text-lg opacity-80" data-testid="vision-statement">Discover, Empower, Transform: Building a Better World</p>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12" data-testid="stats-grid">
            <div className="text-center" data-testid="stat-programs">
              <div className="text-3xl font-bold">16+</div>
              <div className="text-sm opacity-80">Academic Programs</div>
            </div>
            <div className="text-center" data-testid="stat-departments">
              <div className="text-3xl font-bold">18</div>
              <div className="text-sm opacity-80">Departments</div>
            </div>
            <div className="text-center" data-testid="stat-centres">
              <div className="text-3xl font-bold">17</div>
              <div className="text-sm opacity-80">Centres & Cells</div>
            </div>
            <div className="text-center" data-testid="stat-societies">
              <div className="text-3xl font-bold">15</div>
              <div className="text-sm opacity-80">Student Societies</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
            <Button 
              className="bg-accent text-accent-foreground px-8 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors"
              data-testid="cta-explore-programs"
            >
              Explore Programs
            </Button>
            <Button 
              variant="outline"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors"
              data-testid="cta-campus-tour"
            >
              Campus Tour
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
