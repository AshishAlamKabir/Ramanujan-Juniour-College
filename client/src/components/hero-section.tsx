import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function HeroSection() {
  const [showFullMessage, setShowFullMessage] = useState(false);

  const fullMessage = `This prospectus is intended to give all the necessary information about our system of imparting excellent education to the sincere and devoted students wishing for a successful career and shine in today's competitive world. When a drop of water falls into a river, it has no identity, but when it falls on the leaf of a lotus, it shines like a pearl! So choose the best place where you can shine!
Our teachers are dedicated, hardworking and sincere. They teach with such efficacy that the question of private tuitions doesnot arise.
Our students qualify in Medical and Engineering entrance examinations including IIT, ISAT(2011) & PMT without private coaching. Our college class-room teaching is complete and conceptual thus private coaching is not required.The students who go for private tuitions are not at all welcome to our college because it is important to understand that tuitions will not solve the problems. It is merely a waste of self-study hours. Emotionally immature and socially handicapped students fail in life. I have tasted the bitterness of failure several times in my life and this has taught me the three 'D's which are essential for success- "Desire, Dedication and Determination". Imbibing these values in one's life will bear the sweet fruits of success. I want my students to be confident of their abilities, without any inferiority or superioty complex. There is no short cut to success- the sooner you learn this, the better. So I welcome all those students who are sincere, dedicated, respectful, hardwoking, self-reliant, social, obedient, punctual and cultured to "Ramanujan Junior College".

In every Academic Session coaching classes along with regular classes and entrance based tests are held every Saturday.

Powerful tips to success in student life :
1. Use a study table if possible. Avoid studying while lying on bed.
2. Don't get up from your desk during the three hours of study session, not even for drinking water.
3. Don't listen to music during studies.If you have the habit then gradually overcome it day by day. 4. No phone calls and no messaging during studies. Study with 100% concentration as if you are appearing in an examination.
5. You need to scale up your efforts and set a target of 50-55 hours of study at home every week.
6. Update your home work and assignments regularly. Wishing you success in your endeavour.
7. Every student is a unique genius- including you. Discover your unique talent, abilities, interests and values. It is only you who can bring out the best in yourself.
8. Nobody can play your role better than you.
9. Manage your time in such a way that every second is being properly utilised and invest the maximum time you can in improving yourself. Remember that you get 86,400 seconds every day. Every second you waste is a second you will lose forever.
10. Learn something new each day. Make sure that you understand everything that you study. Be observant.
11. Look up the words that you do not understand. Do not leave it for later.
12. Expect much more from yourself than what you expect from others.
13. Help other people around you to the best of your ability and make friendship with those who support you in need.
14. Be very self-confident, self-reliant, self-respecting and self-motivated.
15. Remember one of the most important key to excellence is a positive mental attitude. Your positive work, action and thoughts magnetise an energy in you, to evolve you into a better being.
16. Believe in yourself, believe in your dreams and your actions will create a reality for yourself.
Request to parents/guardians : :
1. Criticism of a teacher or college by parents in the presence of the child is harmful.
2. I request all the guardians not to lay stress on private tuition.`;

  const previewMessage = `This prospectus is intended to give all the necessary information about our system of imparting excellent education to the sincere and devoted students wishing for a successful career and shine in today's competitive world. When a drop of water falls into a river, it has no identity, but when it falls on the leaf of a lotus, it shines like a pearl! So choose the best place where you can shine!
Our teachers are dedicated, hardworking and sincere. They teach with such efficacy that the question of private tuitions doesnot arise.
Our students qualify in Medical and Engineering entrance examinations including IIT, ISAT(2011) & PMT without private coaching. Our college class-room teaching is complete and conceptual thus private coaching is not required...`;

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
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center font-serif" data-testid="heading-principal-desk">
            From Principal's Desk
          </h2>
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Principal's Image Placeholder */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white/20 flex items-center justify-center border-4 border-white/30" data-testid="img-principal">
                <User className="w-16 h-16 md:w-20 md:h-20 text-white/70" />
              </div>
            </div>
            
            {/* Principal's Message */}
            <div className="flex-1 text-center">
              <p className="text-base md:text-lg leading-relaxed mb-4 opacity-95 whitespace-pre-line text-justify" data-testid="text-principal-message">
                {showFullMessage ? fullMessage : previewMessage}
              </p>
              
              {!showFullMessage && (
                <Button 
                  onClick={() => setShowFullMessage(true)}
                  variant="outline"
                  className="mb-6 border-white text-white hover:bg-white hover:text-primary transition-colors"
                  data-testid="button-show-more"
                >
                  Show More
                </Button>
              )}

              {showFullMessage && (
                <Button 
                  onClick={() => setShowFullMessage(false)}
                  variant="outline"
                  className="mb-6 border-white text-white hover:bg-white hover:text-primary transition-colors"
                  data-testid="button-show-less"
                >
                  Show Less
                </Button>
              )}
              
              <div className="font-semibold" data-testid="text-principal-signature">
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
