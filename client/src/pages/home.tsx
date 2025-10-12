// import { Helmet } from "react-helmet-async";
import HeroSection from "@/components/hero-section";
import GalleryCarousel from "@/components/gallery-carousel";
import NoticeBoard from "@/components/notice-board";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Target, Heart, GraduationCap, TrendingUp, Atom, Wrench, Users, FlaskConical, ShieldCheck, CheckCircle } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <>
      {/* <Helmet>
        <title>Ramanujan College - University of Delhi | Premier Institution for Higher Education</title>
        <meta name="description" content="Ramanujan College, University of Delhi - A NAAC A++ graded institution offering undergraduate programs in Arts, Commerce, Science, and Vocational streams. Discover excellence in education since 1958." />
        <meta property="og:title" content="Ramanujan College - University of Delhi" />
        <meta property="og:description" content="NAAC A++ graded premier institution offering quality higher education with 16+ academic programs and world-class facilities." />
        <meta property="og:type" content="website" />
      </Helmet> */}

      {/* Hero Section */}
      <HeroSection />

      {/* Gallery Carousel */}
      <GalleryCarousel />

      {/* Notice Board & Quick Links */}
      <NoticeBoard />

      {/* About Section */}
      <section id="about" className="py-10 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-3 font-serif" data-testid="about-title">About Ramanujan Junior College</h2>
            <p className="text-base text-muted-foreground max-w-3xl mx-auto" data-testid="about-description">
              Founded in 2005, Ramanujan Junior College stands true to its motto - "Education, Development and Progress" 
              with a long-cherished desire to impart quality education and pave the way for splendid careers.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center mb-10">
            {/* About Content */}
            <div className="space-y-5">
              <div>
                <h3 className="text-xl font-semibold mb-3">Our Legacy</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Primarily started as a coaching institute named Ramanujan Academy in 2003, the institution 
                  achieved immense response from society. In 2005, Ramanujan Junior College was established, 
                  offering both Science and Arts streams.
                </p>
                <p className="text-sm text-muted-foreground">
                  Now operating dual services - Ramanujan Junior College and Ramanujan Academy - both are co-educational 
                  institutions committed to preparing students for competitive examinations like JEE and medical entrance tests.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <Card className="p-5 border">
                  <div className="text-2xl font-bold text-primary mb-1.5">2003</div>
                  <div className="text-sm font-medium mb-0.5">Academy Founded</div>
                  <div className="text-xs text-muted-foreground">Ramanujan Academy</div>
                </Card>
                <Card className="p-5 border">
                  <div className="text-2xl font-bold text-accent mb-1.5">2005</div>
                  <div className="text-sm font-medium mb-0.5">College Established</div>
                  <div className="text-xs text-muted-foreground">AHSEC Recognition</div>
                </Card>
              </div>
            </div>

            {/* College Image */}
            <div className="lg:order-first">
              <img 
                src="https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Ramanujan Junior College campus building" 
                className="rounded-xl shadow-lg w-full h-auto"
                data-testid="college-image"
              />
            </div>
          </div>

          {/* Vision, Mission, and Values */}
          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="p-6 border">
              <div className="text-center mb-4">
                <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                  <Eye className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold">Our Motto</h3>
              </div>
              <p className="text-center text-sm text-muted-foreground">
                "Education, Development and Progress" - Our motto reflects our commitment to imparting 
                quality education and ensuring student success in competitive fields.
              </p>
            </Card>

            <Card className="p-6 border">
              <div className="text-center mb-4">
                <div className="w-14 h-14 bg-accent rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="w-7 h-7 text-accent-foreground" />
                </div>
                <h3 className="text-lg font-semibold">Our Focus</h3>
              </div>
              <p className="text-center text-sm text-muted-foreground">
                Intensive coaching by permanent qualified faculty to prepare students for JEE, Medical entrance, 
                improve employability, and nurture social responsibility.
              </p>
            </Card>

            <Card className="p-6 border">
              <div className="text-center mb-4">
                <div className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-7 h-7 text-secondary-foreground" />
                </div>
                <h3 className="text-lg font-semibold">Values</h3>
              </div>
              <p className="text-center text-sm text-muted-foreground">
                Nistha (dedication), Dhriti (courage), and Satyam (truth) - These core values guide our approach 
                to education and character development.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Academic Programs Preview */}
      <section className="py-10 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-3 font-serif">Academic Excellence</h2>
            <p className="text-base text-muted-foreground max-w-3xl mx-auto">
              Explore our comprehensive range of undergraduate programs across arts, commerce, management, 
              science, and vocational streams under the Choice Based Credit System.
            </p>
          </div>

          {/* Program Categories */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <Card className="p-5 border hover:shadow-lg transition-shadow">
              <div className="text-center">
                <div className="w-11 h-11 bg-primary rounded-lg flex items-center justify-center mx-auto mb-3">
                  <GraduationCap className="w-5 h-5 text-primary-foreground" />
                </div>
                <h3 className="font-semibold mb-1.5 text-sm">Arts & Humanities</h3>
                <p className="text-xs text-muted-foreground mb-3 leading-relaxed">English, Hindi, Political Science, Philosophy, Applied Psychology</p>
                <Link href="/academics">
                  <Button variant="link" className="text-primary p-0 h-auto font-medium hover:underline">
                    Explore Programs →
                  </Button>
                </Link>
              </div>
            </Card>

            <Card className="p-5 border hover:shadow-lg transition-shadow">
              <div className="text-center">
                <div className="w-11 h-11 bg-accent rounded-lg flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-5 h-5 text-accent-foreground" />
                </div>
                <h3 className="font-semibold mb-1.5 text-sm">Commerce</h3>
                <p className="text-xs text-muted-foreground mb-3 leading-relaxed">B.Com (Hons.), B.Com (Prog.), Business Management Studies</p>
                <Link href="/academics">
                  <Button variant="link" className="text-primary p-0 h-auto font-medium hover:underline">
                    Explore Programs →
                  </Button>
                </Link>
              </div>
            </Card>

            <Card className="p-5 border hover:shadow-lg transition-shadow">
              <div className="text-center">
                <div className="w-11 h-11 bg-secondary rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Atom className="w-5 h-5 text-secondary-foreground" />
                </div>
                <h3 className="font-semibold mb-1.5 text-sm">Science</h3>
                <p className="text-xs text-muted-foreground mb-3 leading-relaxed">Mathematics, Statistics, Computer Science, Environmental Science</p>
                <Link href="/academics">
                  <Button variant="link" className="text-primary p-0 h-auto font-medium hover:underline">
                    Explore Programs →
                  </Button>
                </Link>
              </div>
            </Card>

            <Card className="p-5 border hover:shadow-lg transition-shadow">
              <div className="text-center">
                <div className="w-11 h-11 bg-primary rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Wrench className="w-5 h-5 text-primary-foreground" />
                </div>
                <h3 className="font-semibold mb-1.5 text-sm">Vocational</h3>
                <p className="text-xs text-muted-foreground mb-3 leading-relaxed">B.Voc courses focused on skill development and industry readiness</p>
                <Link href="/academics">
                  <Button variant="link" className="text-primary p-0 h-auto font-medium hover:underline">
                    Explore Programs →
                  </Button>
                </Link>
              </div>
            </Card>
          </div>

          {/* Academic Resources */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-primary text-primary-foreground p-6">
              <h3 className="text-lg font-semibold mb-3">Academic Resources</h3>
              <ul className="space-y-2.5">
                <li className="flex items-center text-sm">
                  <CheckCircle className="w-4 h-4 mr-2.5" />
                  Choice Based Credit System (CBCS)
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle className="w-4 h-4 mr-2.5" />
                  University of Delhi Syllabus
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle className="w-4 h-4 mr-2.5" />
                  Program & Course Outcomes
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle className="w-4 h-4 mr-2.5" />
                  Regular Academic Calendar
                </li>
              </ul>
              <Link href="/academics#calendar">
                <Button className="mt-4 bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-sm py-2">
                  View Academic Calendar
                </Button>
              </Link>
            </Card>

            <Card className="bg-accent text-accent-foreground p-6">
              <h3 className="text-lg font-semibold mb-3">Student Support</h3>
              <ul className="space-y-2.5">
                <li className="flex items-center text-sm">
                  <CheckCircle className="w-4 h-4 mr-2.5" />
                  Time Tables & Schedules
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle className="w-4 h-4 mr-2.5" />
                  Academic Counseling
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle className="w-4 h-4 mr-2.5" />
                  Career Guidance
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle className="w-4 h-4 mr-2.5" />
                  Research Opportunities
                </li>
              </ul>
              <Link href="/students">
                <Button className="mt-4 bg-accent-foreground text-accent hover:bg-accent-foreground/90 text-sm py-2">
                  Student Resources
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
