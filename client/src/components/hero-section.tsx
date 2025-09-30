
import { User } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="hero-bg text-white relative overflow-hidden">
      {/* Campus background image with overlay */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="relative container mx-auto px-4 py-16">
        {/* Section 1: College Branding */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 font-serif" data-testid="college-name">
            Ramanujan College
          </h1>
          <p className="text-xl md:text-2xl opacity-90" data-testid="vision-statement">
            Discover, Empower, Transform: Building a Better World
          </p>
        </div>

        {/* Section 2: From Principal's Desk */}
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-lg p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center font-serif">
            From Principal's Desk
          </h2>
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Principal's Image Placeholder */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white/20 flex items-center justify-center border-4 border-white/30">
                <User className="w-16 h-16 md:w-20 md:h-20 text-white/70" />
              </div>
            </div>
            
            {/* Principal's Message */}
            <div className="flex-1 text-center md:text-left">
              <p className="text-base md:text-lg leading-relaxed mb-6 opacity-95">
                This prospectus is intended to give all the necessary information about our system of imparting excellent education to the sincere and devoted students wishing for a successful career and shine in today's competitive world. When a drop of water falls into a river, it has no identity, but when it falls on the leaf of a lotus, it shines like a pearl! So choose the best place where you can shine!
              </p>
              
              <div className="font-semibold">
                <p className="text-lg">Principal</p>
                <p className="text-xl">(Mr. Dilip Kumar Borah)</p>
                <p className="text-base opacity-90">Ramanujan Junior College</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
