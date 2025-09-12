// import { Helmet } from "react-helmet-async";
import HeroSection from "@/components/hero-section";
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

      {/* Notice Board & Quick Links */}
      <NoticeBoard />

      {/* About Section */}
      <section id="about" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 font-serif" data-testid="about-title">About Ramanujan College</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto" data-testid="about-description">
              Established in 1958, Ramanujan College has grown into a premier institution of higher education, 
              committed to academic excellence and holistic development of students.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* About Content */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Our Legacy</h3>
                <p className="text-muted-foreground mb-4">
                  Originally established as Deshbandhu College (Evening) in 1958, our institution was renamed 
                  Ramanujan College in 2010 to honor the great mathematician Srinivasa Ramanujan. We became a 
                  full-fledged day college in 2012, marking the beginning of unprecedented growth.
                </p>
                <p className="text-muted-foreground">
                  Our journey from an evening college to a NAAC A++ graded institution reflects our unwavering 
                  commitment to educational excellence and innovation.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <Card className="p-6 border">
                  <div className="text-2xl font-bold text-primary mb-2">2016</div>
                  <div className="text-sm font-medium mb-1">NAAC Grade A</div>
                  <div className="text-xs text-muted-foreground">First accreditation</div>
                </Card>
                <Card className="p-6 border">
                  <div className="text-2xl font-bold text-accent mb-2">26th</div>
                  <div className="text-sm font-medium mb-1">NIRF Ranking</div>
                  <div className="text-xs text-muted-foreground">2018 Achievement</div>
                </Card>
              </div>
            </div>

            {/* College Image */}
            <div className="lg:order-first">
              <img 
                src="https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Ramanujan College campus building" 
                className="rounded-xl shadow-lg w-full h-auto"
                data-testid="college-image"
              />
            </div>
          </div>

          {/* Vision, Mission, and Values */}
          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="p-8 border">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold">Vision</h3>
              </div>
              <p className="text-center text-muted-foreground">
                "Discover, Empower, Transform: Building a Better World" - Our vision draws inspiration from 
                mathematician Srinivasa Ramanujan and embodies our commitment to excellence.
              </p>
            </Card>

            <Card className="p-8 border">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold">Mission</h3>
              </div>
              <p className="text-center text-muted-foreground">
                To empower students and teachers with knowledge, foster innovative learning, ignite critical thinking, 
                improve employability, and nurture social responsibility.
              </p>
            </Card>

            <Card className="p-8 border">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-secondary-foreground" />
                </div>
                <h3 className="text-xl font-semibold">Values</h3>
              </div>
              <p className="text-center text-muted-foreground">
                Nistha (dedication), Dhriti (courage), and Satyam (truth) - These core values guide our approach 
                to education and character development.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Academic Programs Preview */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 font-serif">Academic Excellence</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Explore our comprehensive range of undergraduate programs across arts, commerce, management, 
              science, and vocational streams under the Choice Based Credit System.
            </p>
          </div>

          {/* Program Categories */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="p-6 border hover:shadow-lg transition-shadow">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold mb-2">Arts & Humanities</h3>
                <p className="text-sm text-muted-foreground mb-4">English, Hindi, Political Science, Philosophy, Applied Psychology</p>
                <Link href="/academics">
                  <Button variant="link" className="text-primary p-0 h-auto font-medium hover:underline">
                    Explore Programs →
                  </Button>
                </Link>
              </div>
            </Card>

            <Card className="p-6 border hover:shadow-lg transition-shadow">
              <div className="text-center">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-accent-foreground" />
                </div>
                <h3 className="font-semibold mb-2">Commerce</h3>
                <p className="text-sm text-muted-foreground mb-4">B.Com (Hons.), B.Com (Prog.), Business Management Studies</p>
                <Link href="/academics">
                  <Button variant="link" className="text-primary p-0 h-auto font-medium hover:underline">
                    Explore Programs →
                  </Button>
                </Link>
              </div>
            </Card>

            <Card className="p-6 border hover:shadow-lg transition-shadow">
              <div className="text-center">
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Atom className="w-6 h-6 text-secondary-foreground" />
                </div>
                <h3 className="font-semibold mb-2">Science</h3>
                <p className="text-sm text-muted-foreground mb-4">Mathematics, Statistics, Computer Science, Environmental Science</p>
                <Link href="/academics">
                  <Button variant="link" className="text-primary p-0 h-auto font-medium hover:underline">
                    Explore Programs →
                  </Button>
                </Link>
              </div>
            </Card>

            <Card className="p-6 border hover:shadow-lg transition-shadow">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Wrench className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold mb-2">Vocational</h3>
                <p className="text-sm text-muted-foreground mb-4">B.Voc courses focused on skill development and industry readiness</p>
                <Link href="/academics">
                  <Button variant="link" className="text-primary p-0 h-auto font-medium hover:underline">
                    Explore Programs →
                  </Button>
                </Link>
              </div>
            </Card>
          </div>

          {/* Academic Resources */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-primary text-primary-foreground p-8">
              <h3 className="text-xl font-semibold mb-4">Academic Resources</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-3" />
                  Choice Based Credit System (CBCS)
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-3" />
                  University of Delhi Syllabus
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-3" />
                  Program & Course Outcomes
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-3" />
                  Regular Academic Calendar
                </li>
              </ul>
              <Link href="/academics#calendar">
                <Button className="mt-6 bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                  View Academic Calendar
                </Button>
              </Link>
            </Card>

            <Card className="bg-accent text-accent-foreground p-8">
              <h3 className="text-xl font-semibold mb-4">Student Support</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-3" />
                  Time Tables & Schedules
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-3" />
                  Academic Counseling
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-3" />
                  Career Guidance
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-3" />
                  Research Opportunities
                </li>
              </ul>
              <Link href="/students">
                <Button className="mt-6 bg-accent-foreground text-accent hover:bg-accent-foreground/90">
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
