// import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Award, Users, Building, FileText, BookOpen } from "lucide-react";

export default function About() {
  return (
    <>
      {/* <Helmet>
        <title>About Ramanujan College | History, Vision & Mission - University of Delhi</title>
        <meta name="description" content="Learn about Ramanujan College's rich history since 1958, our vision and mission, NAAC A++ accreditation, and commitment to academic excellence at University of Delhi." />
      </Helmet> */}

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif" data-testid="page-title">
                About Ramanujan College
              </h1>
              <p className="text-xl opacity-90" data-testid="page-subtitle">
                A Journey of Excellence Since 1958
              </p>
              <Badge className="mt-4 bg-accent text-accent-foreground" data-testid="naac-badge">
                NAAC A++ Grade (CGPA 3.71)
              </Badge>
            </div>
          </div>
        </section>

        {/* History Section */}
        <section id="history" className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center font-serif" data-testid="history-title">
                Our History
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
                <div>
                  <p className="text-muted-foreground mb-4">
                    Ramanujan College was established in 1958 as Deshbandhu College (Evening) and was later renamed 
                    Ramanujan College in 2010 to honor the great mathematician Srinivasa Ramanujan. The college became 
                    a full-fledged day college in 2012, marking the beginning of a decade of unprecedented growth.
                  </p>
                  <p className="text-muted-foreground mb-6">
                    Our transformation journey reflects our commitment to providing quality education and adapting to 
                    the evolving needs of higher education in India.
                  </p>
                </div>
                <div>
                  <img 
                    src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                    alt="Historical college building" 
                    className="rounded-lg shadow-lg w-full"
                    data-testid="history-image"
                  />
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-8" data-testid="timeline">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                    <Calendar className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">1958 - Foundation</h3>
                    <p className="text-muted-foreground">
                      Established as Deshbandhu College (Evening) to provide higher education opportunities 
                      for working students in the Delhi region.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-accent rounded-full flex items-center justify-center">
                    <Building className="w-8 h-8 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">2010 - Renaming</h3>
                    <p className="text-muted-foreground">
                      Renamed to Ramanujan College in honor of the legendary Indian mathematician 
                      Srinivasa Ramanujan, reflecting our commitment to mathematical excellence.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-secondary rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-secondary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">2012 - Day College</h3>
                    <p className="text-muted-foreground">
                      Transitioned to a full-fledged day college, expanding our academic programs 
                      and infrastructure to serve a broader student community.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                    <Award className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">2016 - NAAC Accreditation</h3>
                    <p className="text-muted-foreground">
                      Achieved NAAC Grade "A" accreditation, later upgraded to A++ grade (CGPA 3.71), 
                      recognizing our commitment to quality education and institutional excellence.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-accent rounded-full flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">2018 - NIRF Ranking</h3>
                    <p className="text-muted-foreground">
                      Achieved 26th position in NIRF College category rankings, establishing our reputation 
                      as one of India's leading undergraduate institutions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission Section */}
        <section id="vision" className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 font-serif" data-testid="vision-mission-title">
                Vision & Mission
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Our guiding principles that shape our educational philosophy and institutional culture
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              <Card className="p-8">
                <CardHeader className="text-center pb-6">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-2xl">Our Vision</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-lg font-semibold mb-4 text-primary">
                    "Discover, Empower, Transform: Building a Better World"
                  </p>
                  <p className="text-muted-foreground">
                    Drawing inspiration from mathematician Srinivasa Ramanujan, our vision embodies the values of 
                    Nistha (dedication), Dhriti (courage), and Satyam (truth). We aspire to create an environment 
                    where students and faculty discover their potential, are empowered with knowledge and skills, 
                    and transform themselves to contribute meaningfully to society.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-8">
                <CardHeader className="text-center pb-6">
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building className="w-8 h-8 text-accent-foreground" />
                  </div>
                  <CardTitle className="text-2xl">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Empower students and teachers with knowledge and critical thinking skills
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Foster innovative and contextual learning methodologies
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Ignite inquiry, creativity, and analytical thinking
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Improve employability and career readiness
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Nurture social responsibility and ethical leadership
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Core Values */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="text-center p-6">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Nistha (Dedication)</h3>
                <p className="text-muted-foreground text-sm">
                  Unwavering commitment to excellence in education and character development
                </p>
              </Card>

              <Card className="text-center p-6">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Dhriti (Courage)</h3>
                <p className="text-muted-foreground text-sm">
                  Boldness to innovate, challenge conventions, and embrace positive change
                </p>
              </Card>

              <Card className="text-center p-6">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-6 h-6 text-secondary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Satyam (Truth)</h3>
                <p className="text-muted-foreground text-sm">
                  Commitment to honesty, integrity, and transparency in all our endeavors
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Leadership & Governance */}
        <section id="leadership" className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 font-serif" data-testid="leadership-title">
                Leadership & Governance
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Our leadership team is committed to maintaining the highest standards of academic excellence 
                and institutional governance
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="w-6 h-6 mr-2 text-primary" />
                    Chairperson's Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <blockquote className="text-muted-foreground italic mb-4">
                    "Education with infinite ambition and treating public-funded higher education as a 
                    shared responsibility for societal progress."
                  </blockquote>
                  <p className="text-sm text-muted-foreground">
                    Our Chairperson emphasizes the importance of visionary leadership and dedication to 
                    quality education that serves the broader community and nation.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building className="w-6 h-6 mr-2 text-accent" />
                    Principal's Vision
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Our Principal's leadership focuses on creating an environment that fosters academic 
                    excellence, research innovation, and holistic student development.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    The leadership team works collaboratively to ensure that Ramanujan College continues 
                    to set benchmarks in higher education.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Governance */}
        <section id="governance" className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 font-serif">Institutional Governance</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Transparent and effective governance structures ensure accountability and continuous improvement
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center p-6">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold mb-2">Governing Body</h3>
                <p className="text-sm text-muted-foreground">
                  Decision-making authority with representatives from various stakeholder groups
                </p>
              </Card>

              <Card className="text-center p-6">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-accent-foreground" />
                </div>
                <h3 className="font-semibold mb-2">IQAC</h3>
                <p className="text-sm text-muted-foreground">
                  Internal Quality Assurance Cell ensuring continuous improvement in academic standards
                </p>
              </Card>

              <Card className="text-center p-6">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-6 h-6 text-secondary-foreground" />
                </div>
                <h3 className="font-semibold mb-2">Committees</h3>
                <p className="text-sm text-muted-foreground">
                  Various committees for admissions, discipline, library, and academic affairs
                </p>
              </Card>

              <Card className="text-center p-6">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold mb-2">Policies</h3>
                <p className="text-sm text-muted-foreground">
                  Comprehensive policies for research, IPR, consultancy, and ethical practices
                </p>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
