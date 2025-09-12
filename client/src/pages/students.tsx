import { useQuery } from "@tanstack/react-query";
// import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar,
  Clock,
  BookOpen,
  Download,
  Users,
  Shield,
  Heart,
  Music,
  Palette,
  Camera,
  Mic,
  Trophy,
  FlaskConical,
  Briefcase,
  FileText,
  ExternalLink,
  CheckCircle,
  Newspaper,
  Library,
  GraduationCap
} from "lucide-react";
import { Notice } from "@shared/schema";
import { formatDistanceToNow } from "date-fns";

export default function Students() {
  const { data: notices, isLoading: noticesLoading } = useQuery<Notice[]>({
    queryKey: ["/api/notices"],
  });

  const societies = [
    { name: "NSS", description: "National Service Scheme", icon: Users, category: "Service" },
    { name: "NCC", description: "National Cadet Corps", icon: Shield, category: "Service" },
    { name: "Debating Society", description: "Public speaking & debates", icon: Mic, category: "Literary" },
    { name: "Theatre Society", description: "Drama & performing arts", icon: Palette, category: "Cultural" },
    { name: "Music Society", description: "Musical performances", icon: Music, category: "Cultural" },
    { name: "Dance Society", description: "Classical & contemporary", icon: Users, category: "Cultural" },
    { name: "Fine Arts", description: "Visual arts & creativity", icon: Palette, category: "Cultural" },
    { name: "Film Society", description: "Cinema & media arts", icon: Camera, category: "Cultural" },
  ];

  const centres = [
    { name: "Centre for Ethics", description: "Promoting ethical values and moral education" },
    { name: "Human Rights Centre", description: "Awareness and advocacy programs" },
    { name: "Entrepreneurship Cell", description: "Supporting student startups and innovation" },
    { name: "Robotics & AI Centre", description: "Cutting-edge technology research" },
    { name: "Social Innovation Centre", description: "Community-focused research initiatives" },
  ];

  const supportServices = [
    {
      title: "Academic Counseling",
      description: "Guidance for course selection and academic planning",
      icon: GraduationCap
    },
    {
      title: "Placement Cell",
      description: "Career guidance and job placement assistance",
      icon: Briefcase
    },
    {
      title: "Student Welfare",
      description: "Comprehensive support for student well-being",
      icon: Heart
    },
    {
      title: "Anti-Ragging",
      description: "Safe and secure campus environment",
      icon: Shield
    }
  ];

  const resources = [
    {
      title: "Academic Resources",
      items: ["Time Tables & Schedules", "Academic Calendar", "Examination Guidelines", "Rules & Regulations"],
      color: "primary",
      icon: Calendar
    },
    {
      title: "Downloads Center",
      items: ["Application Forms", "Student Handbooks", "Annual Reports", "Policy Documents"],
      color: "accent",
      icon: Download
    },
    {
      title: "Library Services",
      items: ["Online Catalog", "E-Resources Access", "Digital Collections", "Research Support"],
      color: "secondary",
      icon: Library
    }
  ];

  return (
    <>
      {/* <Helmet>
        <title>Student Life - Ramanujan College | Resources, Societies & Support Services - University of Delhi</title>
        <meta name="description" content="Explore vibrant student life at Ramanujan College with 15 student societies, 17 centres & cells, comprehensive support services, and academic resources for holistic development." />
      </Helmet> */}

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif" data-testid="page-title">
                Vibrant Student Life
              </h1>
              <p className="text-xl opacity-90" data-testid="page-subtitle">
                Beyond Academics - Holistic Development & Growth
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                <Badge className="bg-accent text-accent-foreground px-4 py-2" data-testid="societies-badge">
                  15 Student Societies
                </Badge>
                <Badge className="bg-secondary text-secondary-foreground px-4 py-2" data-testid="centres-badge">
                  17 Centres & Cells
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Student Resources Navigation */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="notices" className="w-full">
              <TabsList className="grid w-full grid-cols-6 mb-8" data-testid="tabs-list">
                <TabsTrigger value="notices" data-testid="tab-notices">Notices</TabsTrigger>
                <TabsTrigger value="timetables" data-testid="tab-timetables">Timetables</TabsTrigger>
                <TabsTrigger value="societies" data-testid="tab-societies">Societies</TabsTrigger>
                <TabsTrigger value="centres" data-testid="tab-centres">Centres</TabsTrigger>
                <TabsTrigger value="placement" data-testid="tab-placement">Placement</TabsTrigger>
                <TabsTrigger value="library" data-testid="tab-library">Library</TabsTrigger>
              </TabsList>

              {/* Notices & Updates */}
              <TabsContent value="notices" id="notices">
                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold mb-4 font-serif" data-testid="notices-title">
                      Latest Notices & Updates
                    </h2>
                    <p className="text-lg text-muted-foreground">
                      Stay informed with the latest announcements and important information
                    </p>
                  </div>

                  {noticesLoading ? (
                    <div className="grid gap-4">
                      {[...Array(5)].map((_, i) => (
                        <Card key={i} className="p-6">
                          <div className="h-4 bg-muted-foreground/20 rounded animate-pulse mb-2"></div>
                          <div className="h-3 bg-muted-foreground/20 rounded animate-pulse w-2/3"></div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {notices && notices.length > 0 ? (
                        notices.map((notice, index) => (
                          <Card key={notice.id} className="p-6 hover:shadow-lg transition-shadow" data-testid={`notice-card-${index}`}>
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h3 className="text-lg font-semibold">{notice.title}</h3>
                                  <Badge 
                                    variant={notice.priority === 'high' ? 'destructive' : notice.priority === 'medium' ? 'default' : 'outline'}
                                    data-testid={`notice-priority-${index}`}
                                  >
                                    {notice.priority}
                                  </Badge>
                                  {notice.category && (
                                    <Badge variant="secondary" data-testid={`notice-category-${index}`}>
                                      {notice.category}
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-muted-foreground mb-2">{notice.content}</p>
                                {notice.publishedAt && (
                                  <p className="text-sm text-muted-foreground">
                                    Published {formatDistanceToNow(new Date(notice.publishedAt), { addSuffix: true })}
                                  </p>
                                )}
                              </div>
                              <Newspaper className="w-6 h-6 text-muted-foreground flex-shrink-0 ml-4" />
                            </div>
                          </Card>
                        ))
                      ) : (
                        <Card className="p-12 text-center">
                          <Newspaper className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                          <h3 className="text-xl font-semibold mb-2">No Notices Available</h3>
                          <p className="text-muted-foreground">
                            Check back later for the latest notices and updates.
                          </p>
                        </Card>
                      )}
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Timetables */}
              <TabsContent value="timetables" id="timetables">
                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold mb-4 font-serif" data-testid="timetables-title">
                      Academic Timetables
                    </h2>
                    <p className="text-lg text-muted-foreground">
                      Access class schedules and academic calendar information
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                      <Clock className="w-12 h-12 mx-auto mb-4 text-primary" />
                      <h3 className="font-semibold mb-2">Semester Timetables</h3>
                      <p className="text-sm text-muted-foreground mb-4">Current semester class schedules for all programs</p>
                      <Button variant="outline" data-testid="view-semester-timetables">
                        View Timetables
                      </Button>
                    </Card>

                    <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                      <Calendar className="w-12 h-12 mx-auto mb-4 text-accent" />
                      <h3 className="font-semibold mb-2">Academic Calendar</h3>
                      <p className="text-sm text-muted-foreground mb-4">Important academic dates and holidays</p>
                      <Button variant="outline" data-testid="view-academic-calendar">
                        View Calendar
                      </Button>
                    </Card>

                    <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                      <FileText className="w-12 h-12 mx-auto mb-4 text-secondary" />
                      <h3 className="font-semibold mb-2">Examination Schedule</h3>
                      <p className="text-sm text-muted-foreground mb-4">Mid-term and end-semester exam schedules</p>
                      <Button variant="outline" data-testid="view-exam-schedule">
                        View Schedule
                      </Button>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Student Societies */}
              <TabsContent value="societies">
                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold mb-4 font-serif" data-testid="societies-title">
                      Student Societies
                    </h2>
                    <p className="text-lg text-muted-foreground">
                      Join our 15 active student societies and explore your interests
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {societies.map((society, index) => (
                      <Card key={society.name} className="p-6 text-center hover:shadow-lg transition-shadow" data-testid={`society-${index}`}>
                        <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                          <society.icon className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <h3 className="font-semibold mb-2">{society.name}</h3>
                        <Badge variant="outline" className="mb-3">{society.category}</Badge>
                        <p className="text-sm text-muted-foreground">{society.description}</p>
                      </Card>
                    ))}
                  </div>

                  <Card className="p-8 bg-gradient-to-r from-primary/10 to-accent/10">
                    <div className="text-center">
                      <h3 className="text-2xl font-semibold mb-4">Join a Society</h3>
                      <p className="text-muted-foreground mb-6">
                        Enhance your college experience by joining societies that match your interests and talents.
                        Develop leadership skills, make lifelong friendships, and contribute to campus life.
                      </p>
                      <Button data-testid="join-societies">
                        Learn More About Societies
                      </Button>
                    </div>
                  </Card>
                </div>
              </TabsContent>

              {/* Research Centres */}
              <TabsContent value="centres">
                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold mb-4 font-serif" data-testid="centres-title">
                      Centres & Cells
                    </h2>
                    <p className="text-lg text-muted-foreground">
                      17 specialized centres fostering research and innovation
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {centres.map((centre, index) => (
                      <Card key={centre.name} className="p-6 hover:shadow-lg transition-shadow" data-testid={`centre-${index}`}>
                        <CardHeader className="p-0 pb-4">
                          <CardTitle className="flex items-center">
                            <FlaskConical className="w-6 h-6 mr-2 text-primary" />
                            {centre.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                          <p className="text-muted-foreground">{centre.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <Card className="p-8 bg-gradient-to-r from-secondary/10 to-primary/10">
                    <div className="text-center">
                      <h3 className="text-2xl font-semibold mb-4">Research Opportunities</h3>
                      <p className="text-muted-foreground mb-6">
                        Our centres provide excellent opportunities for students to engage in meaningful research 
                        and contribute to societal development through innovative projects and initiatives.
                      </p>
                      <Button variant="outline" data-testid="explore-research">
                        Explore Research Opportunities
                      </Button>
                    </div>
                  </Card>
                </div>
              </TabsContent>

              {/* Placement Cell */}
              <TabsContent value="placement" id="placement">
                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold mb-4 font-serif" data-testid="placement-title">
                      Placement & Career Development
                    </h2>
                    <p className="text-lg text-muted-foreground">
                      Comprehensive career support and placement assistance
                    </p>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8">
                    <Card className="p-8">
                      <CardHeader className="p-0 mb-6">
                        <CardTitle className="flex items-center text-2xl">
                          <Briefcase className="w-6 h-6 mr-2 text-primary" />
                          Our Mission
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        <p className="text-muted-foreground mb-6">
                          The Placement & Career Development Cell ensures optimal career opportunities for students 
                          through industry partnerships, training programs, and comprehensive career guidance.
                        </p>
                        <ul className="space-y-3">
                          <li className="flex items-start">
                            <CheckCircle className="w-5 h-5 mr-3 mt-0.5 text-primary" />
                            <span className="text-sm">Year-round placement activities</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-5 h-5 mr-3 mt-0.5 text-primary" />
                            <span className="text-sm">Industry partnerships and networking</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-5 h-5 mr-3 mt-0.5 text-primary" />
                            <span className="text-sm">Personality development programs</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-5 h-5 mr-3 mt-0.5 text-primary" />
                            <span className="text-sm">Internship opportunities</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="p-8">
                      <CardHeader className="p-0 mb-6">
                        <CardTitle className="flex items-center text-2xl">
                          <Trophy className="w-6 h-6 mr-2 text-accent" />
                          Services Offered
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold mb-2">Training Programs</h4>
                            <p className="text-sm text-muted-foreground">Resume writing, interview skills, group discussions</p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Industry Interaction</h4>
                            <p className="text-sm text-muted-foreground">Guest lectures, workshops, webinars by industry experts</p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Career Counseling</h4>
                            <p className="text-sm text-muted-foreground">Individual guidance and career pathway planning</p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Alumni Network</h4>
                            <p className="text-sm text-muted-foreground">Connect with successful alumni for mentorship</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <Card className="p-6 text-center">
                      <h3 className="text-2xl font-bold text-primary mb-2">85%+</h3>
                      <p className="font-semibold mb-1">Placement Rate</p>
                      <p className="text-sm text-muted-foreground">Annual placement success</p>
                    </Card>
                    <Card className="p-6 text-center">
                      <h3 className="text-2xl font-bold text-accent mb-2">100+</h3>
                      <p className="font-semibold mb-1">Companies</p>
                      <p className="text-sm text-muted-foreground">Recruiting partners</p>
                    </Card>
                    <Card className="p-6 text-center">
                      <h3 className="text-2xl font-bold text-secondary mb-2">₹15L+</h3>
                      <p className="font-semibold mb-1">Highest Package</p>
                      <p className="text-sm text-muted-foreground">Annual CTC offered</p>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Library */}
              <TabsContent value="library" id="library">
                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold mb-4 font-serif" data-testid="library-title">
                      Library Services
                    </h2>
                    <p className="text-lg text-muted-foreground">
                      State-of-the-art library with automated systems and digital resources
                    </p>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8">
                    <Card className="p-8">
                      <CardHeader className="p-0 mb-6">
                        <CardTitle className="flex items-center text-2xl">
                          <BookOpen className="w-6 h-6 mr-2 text-primary" />
                          Library Features
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        <ul className="space-y-3">
                          <li className="flex items-start">
                            <CheckCircle className="w-5 h-5 mr-3 mt-0.5 text-primary" />
                            <span className="text-sm">RFID and KOHA software integration</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-5 h-5 mr-3 mt-0.5 text-primary" />
                            <span className="text-sm">Separate reading rooms for focused study</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-5 h-5 mr-3 mt-0.5 text-primary" />
                            <span className="text-sm">Digital resources and e-journals</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-5 h-5 mr-3 mt-0.5 text-primary" />
                            <span className="text-sm">Online catalog (WEBOPAC) access</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-5 h-5 mr-3 mt-0.5 text-primary" />
                            <span className="text-sm">Extended hours during exams</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="p-8">
                      <CardHeader className="p-0 mb-6">
                        <CardTitle className="flex items-center text-2xl">
                          <ExternalLink className="w-6 h-6 mr-2 text-accent" />
                          E-Resources
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold mb-2">Digital Collections</h4>
                            <p className="text-sm text-muted-foreground">Access to DELNET, N-LIST, and NDL resources</p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Online Courses</h4>
                            <p className="text-sm text-muted-foreground">NPTEL and e-PG Pathshala course materials</p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Research Databases</h4>
                            <p className="text-sm text-muted-foreground">Access to academic journals and research papers</p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Ask the Librarian</h4>
                            <p className="text-sm text-muted-foreground">Expert assistance for research and queries</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="p-8 bg-gradient-to-r from-primary/10 to-secondary/10">
                    <div className="text-center">
                      <h3 className="text-2xl font-semibold mb-4">Library Portal</h3>
                      <p className="text-muted-foreground mb-6">
                        Access our comprehensive library portal for catalog search, resource booking, 
                        and digital collection access from anywhere on campus.
                      </p>
                      <Button data-testid="library-portal">
                        Visit Library Portal
                      </Button>
                    </div>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Support Services */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 font-serif" data-testid="support-title">
                Student Support Services
              </h2>
              <p className="text-lg text-muted-foreground">
                Comprehensive support for your academic and personal well-being
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {supportServices.map((service, index) => (
                <Card key={service.title} className="p-6 text-center hover:shadow-lg transition-shadow" data-testid={`support-service-${index}`}>
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <service.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Access Resources */}
        <section id="forms" className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 font-serif" data-testid="resources-title">
                Quick Access Resources
              </h2>
              <p className="text-lg text-muted-foreground">
                Essential resources at your fingertips
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {resources.map((resource, index) => (
                <Card key={resource.title} className={`bg-${resource.color} text-${resource.color}-foreground p-8`} data-testid={`resource-${index}`}>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <resource.icon className="w-5 h-5 mr-2" />
                    {resource.title}
                  </h3>
                  <ul className="space-y-2 text-sm mb-6">
                    {resource.items.map((item, itemIndex) => (
                      <li key={item} className="flex items-center" data-testid={`resource-item-${index}-${itemIndex}`}>
                        <span className="mr-2">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full bg-${resource.color}-foreground text-${resource.color} hover:bg-${resource.color}-foreground/90`}
                    data-testid={`access-${resource.title.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    Access Resources
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
