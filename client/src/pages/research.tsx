// import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FlaskConical,
  Users,
  Award,
  BookOpen,
  TrendingUp,
  Lightbulb,
  Target,
  CheckCircle,
  ExternalLink,
  FileText,
  Microscope,
  Cpu,
  Leaf,
  Globe,
  Heart,
  Scale,
  Building,
  Smartphone
} from "lucide-react";

export default function Research() {
  const researchCentres = [
    {
      name: "Centre for Robotics & AI",
      description: "Advancing artificial intelligence and robotics research with practical applications",
      icon: Cpu,
      established: 2018,
      focus: "AI, Machine Learning, Robotics"
    },
    {
      name: "Social Innovation Centre",
      description: "Community-focused research initiatives addressing social challenges",
      icon: Heart,
      established: 2019,
      focus: "Social Impact, Community Development"
    },
    {
      name: "Centre for Ethics",
      description: "Research in applied ethics and moral philosophy",
      icon: Scale,
      established: 2015,
      focus: "Ethics, Philosophy, Moral Studies"
    },
    {
      name: "Entrepreneurship Cell",
      description: "Supporting innovation and startup culture through research",
      icon: Lightbulb,
      established: 2017,
      focus: "Innovation, Startups, Business Development"
    },
    {
      name: "Environmental Research Centre",
      description: "Sustainability and environmental science research",
      icon: Leaf,
      established: 2016,
      focus: "Environmental Science, Sustainability"
    },
    {
      name: "Human Rights Centre",
      description: "Legal and social research on human rights issues",
      icon: Users,
      established: 2014,
      focus: "Human Rights, Legal Studies"
    }
  ];

  const researchAreas = [
    {
      title: "Computer Science & Technology",
      description: "Artificial Intelligence, Machine Learning, Data Science, Cybersecurity",
      icon: Smartphone,
      projects: "15+ Active Projects"
    },
    {
      title: "Environmental Sciences",
      description: "Climate Change, Sustainability, Pollution Control, Green Technology",
      icon: Leaf,
      projects: "12+ Active Projects"
    },
    {
      title: "Social Sciences",
      description: "Public Policy, Human Rights, Political Science, Psychology",
      icon: Users,
      projects: "20+ Active Projects"
    },
    {
      title: "Mathematics & Statistics",
      description: "Applied Mathematics, Statistical Analysis, Data Modeling",
      icon: Target,
      projects: "8+ Active Projects"
    },
    {
      title: "Commerce & Management",
      description: "Financial Markets, Entrepreneurship, Digital Commerce",
      icon: TrendingUp,
      projects: "10+ Active Projects"
    },
    {
      title: "Applied Psychology",
      description: "Behavioral Studies, Mental Health, Cognitive Research",
      icon: Heart,
      projects: "6+ Active Projects"
    }
  ];

  const achievements = [
    {
      title: "Research Publications",
      value: "150+",
      description: "Peer-reviewed publications in national and international journals"
    },
    {
      title: "Research Grants",
      value: "₹2.5 Cr",
      description: "Total research funding secured from various agencies"
    },
    {
      title: "Active Projects",
      value: "25+",
      description: "Ongoing research projects across departments"
    },
    {
      title: "Research Scholars",
      value: "40+",
      description: "Faculty and students involved in research activities"
    }
  ];

  const facilities = [
    {
      title: "Research Labs",
      items: ["Robotics & AI Lab", "Psychology Research Lab", "Environmental Science Lab", "Computer Science Labs"]
    },
    {
      title: "Digital Infrastructure",
      items: ["High-speed Internet", "Digital Library Access", "Research Databases", "Statistical Software"]
    },
    {
      title: "Collaboration Network",
      items: ["Industry Partnerships", "Academic Collaborations", "International Linkages", "Alumni Network"]
    }
  ];

  return (
    <>
      {/* <Helmet>
        <title>Research & Innovation - Ramanujan College | Academic Research Centers - University of Delhi</title>
        <meta name="description" content="Explore cutting-edge research at Ramanujan College with 17 research centres, active projects in AI, environmental science, social innovation, and more. Join our research community." />
      </Helmet> */}

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif" data-testid="page-title">
                Research & Innovation
              </h1>
              <p className="text-xl opacity-90 mb-6" data-testid="page-subtitle">
                Advancing Knowledge Through Cutting-Edge Research
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Badge className="bg-accent text-accent-foreground px-4 py-2" data-testid="centres-badge">
                  17 Research Centres
                </Badge>
                <Badge className="bg-secondary text-secondary-foreground px-4 py-2" data-testid="projects-badge">
                  25+ Active Projects
                </Badge>
                <Badge className="bg-accent text-accent-foreground px-4 py-2" data-testid="publications-badge">
                  150+ Publications
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Research Overview */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 font-serif" data-testid="overview-title">
                Research Excellence
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Ramanujan College is committed to fostering a vibrant research culture that addresses 
                contemporary challenges and contributes to the advancement of knowledge across disciplines.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-center mb-16">
              <div>
                <h3 className="text-2xl font-semibold mb-6">Our Research Philosophy</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 mr-3 mt-1 text-primary flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Interdisciplinary Approach</h4>
                      <p className="text-muted-foreground text-sm">
                        Encouraging collaboration across departments for comprehensive research solutions
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 mr-3 mt-1 text-primary flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Social Impact</h4>
                      <p className="text-muted-foreground text-sm">
                        Focusing on research that addresses real-world problems and benefits society
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 mr-3 mt-1 text-primary flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Innovation & Technology</h4>
                      <p className="text-muted-foreground text-sm">
                        Leveraging cutting-edge technology for advanced research methodologies
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 mr-3 mt-1 text-primary flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Student Participation</h4>
                      <p className="text-muted-foreground text-sm">
                        Involving undergraduate students in research activities and projects
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                  alt="Research laboratory" 
                  className="rounded-xl shadow-lg w-full"
                  data-testid="research-image"
                />
              </div>
            </div>

            {/* Research Achievements */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {achievements.map((achievement, index) => (
                <Card key={achievement.title} className="p-6 text-center hover:shadow-lg transition-shadow" data-testid={`achievement-${index}`}>
                  <h3 className="text-3xl font-bold text-primary mb-2">{achievement.value}</h3>
                  <h4 className="font-semibold mb-2">{achievement.title}</h4>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Research Centres */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 font-serif" data-testid="centres-title">
                Research Centres & Cells
              </h2>
              <p className="text-lg text-muted-foreground">
                17 specialized centres driving innovation and research excellence
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {researchCentres.map((centre, index) => (
                <Card key={centre.name} className="p-6 hover:shadow-lg transition-shadow" data-testid={`centre-${index}`}>
                  <CardHeader className="p-0 pb-4">
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                        <centre.icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <Badge variant="outline">Est. {centre.established}</Badge>
                    </div>
                    <CardTitle className="text-lg">{centre.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-muted-foreground mb-4">{centre.description}</p>
                    <div className="text-sm">
                      <span className="font-semibold">Focus Areas:</span>
                      <span className="text-muted-foreground ml-2">{centre.focus}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Research Areas */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 font-serif" data-testid="areas-title">
                Key Research Areas
              </h2>
              <p className="text-lg text-muted-foreground">
                Diverse research domains addressing contemporary challenges
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {researchAreas.map((area, index) => (
                <Card key={area.title} className="p-6 hover:shadow-lg transition-shadow" data-testid={`research-area-${index}`}>
                  <CardHeader className="p-0 pb-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                        <area.icon className="w-6 h-6 text-accent-foreground" />
                      </div>
                      <Badge variant="secondary">{area.projects}</Badge>
                    </div>
                    <CardTitle className="text-lg">{area.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-muted-foreground">{area.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Research Facilities */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 font-serif" data-testid="facilities-title">
                Research Infrastructure
              </h2>
              <p className="text-lg text-muted-foreground">
                State-of-the-art facilities supporting cutting-edge research
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {facilities.map((facility, index) => (
                <Card key={facility.title} className="p-8" data-testid={`facility-${index}`}>
                  <CardHeader className="p-0 pb-6">
                    <CardTitle className="flex items-center text-xl">
                      <FlaskConical className="w-6 h-6 mr-2 text-primary" />
                      {facility.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ul className="space-y-3">
                      {facility.items.map((item, itemIndex) => (
                        <li key={item} className="flex items-start" data-testid={`facility-item-${index}-${itemIndex}`}>
                          <CheckCircle className="w-4 h-4 mr-3 mt-0.5 text-primary flex-shrink-0" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Research Opportunities */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 font-serif" data-testid="opportunities-title">
                Research Opportunities
              </h2>
              <p className="text-lg text-muted-foreground">
                Get involved in research activities and contribute to knowledge creation
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="flex items-center text-2xl">
                    <Users className="w-6 h-6 mr-2 text-primary" />
                    For Students
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <Award className="w-5 h-5 mr-3 mt-0.5 text-primary flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold mb-1">Research Internships</h4>
                        <p className="text-sm text-muted-foreground">
                          Participate in ongoing research projects during summer breaks
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <BookOpen className="w-5 h-5 mr-3 mt-0.5 text-primary flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold mb-1">Dissertation Projects</h4>
                        <p className="text-sm text-muted-foreground">
                          Work on research-based projects as part of your curriculum
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Lightbulb className="w-5 h-5 mr-3 mt-0.5 text-primary flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold mb-1">Innovation Challenges</h4>
                        <p className="text-sm text-muted-foreground">
                          Participate in research competitions and innovation contests
                        </p>
                      </div>
                    </li>
                  </ul>
                  <Button className="mt-6 w-full" data-testid="student-research">
                    Explore Student Research
                  </Button>
                </CardContent>
              </Card>

              <Card className="p-8">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="flex items-center text-2xl">
                    <Microscope className="w-6 h-6 mr-2 text-accent" />
                    For Faculty
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <TrendingUp className="w-5 h-5 mr-3 mt-0.5 text-accent flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold mb-1">Research Grants</h4>
                        <p className="text-sm text-muted-foreground">
                          Access funding opportunities from various government agencies
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Globe className="w-5 h-5 mr-3 mt-0.5 text-accent flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold mb-1">Collaborative Research</h4>
                        <p className="text-sm text-muted-foreground">
                          Partner with national and international institutions
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <FileText className="w-5 h-5 mr-3 mt-0.5 text-accent flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold mb-1">Publication Support</h4>
                        <p className="text-sm text-muted-foreground">
                          Institutional support for research publications and conferences
                        </p>
                      </div>
                    </li>
                  </ul>
                  <Button variant="outline" className="mt-6 w-full" data-testid="faculty-research">
                    Faculty Research Portal
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Research Publications & Recognition */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 font-serif" data-testid="publications-title">
                Publications & Recognition
              </h2>
              <p className="text-lg text-muted-foreground">
                Our research contributes to global knowledge and receives international recognition
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-8 text-center">
                <BookOpen className="w-16 h-16 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-4">Recent Publications</h3>
                <p className="text-muted-foreground mb-6">
                  Browse our latest research publications in peer-reviewed journals and conferences.
                </p>
                <Button variant="outline" data-testid="view-publications">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Publications
                </Button>
              </Card>

              <Card className="p-8 text-center">
                <Award className="w-16 h-16 mx-auto mb-4 text-accent" />
                <h3 className="text-xl font-semibold mb-4">Awards & Recognition</h3>
                <p className="text-muted-foreground mb-6">
                  Our faculty and students have received numerous awards for their research contributions.
                </p>
                <Button variant="outline" data-testid="view-awards">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Awards
                </Button>
              </Card>

              <Card className="p-8 text-center">
                <Building className="w-16 h-16 mx-auto mb-4 text-secondary" />
                <h3 className="text-xl font-semibold mb-4">Industry Partnerships</h3>
                <p className="text-muted-foreground mb-6">
                  Collaborations with industry leaders for applied research and innovation.
                </p>
                <Button variant="outline" data-testid="view-partnerships">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Partnerships
                </Button>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Research */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="p-8 bg-gradient-to-r from-primary/10 to-accent/10">
                <div className="text-center">
                  <h3 className="text-3xl font-bold mb-4">Join Our Research Community</h3>
                  <p className="text-lg text-muted-foreground mb-8">
                    Whether you're a student interested in research or a faculty member looking to collaborate, 
                    we welcome you to be part of our vibrant research ecosystem.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button data-testid="contact-research">
                      Contact Research Office
                    </Button>
                    <Button variant="outline" data-testid="research-policies">
                      Research Policies
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
