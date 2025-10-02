import { useQuery } from "@tanstack/react-query";
// import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  GraduationCap, 
  TrendingUp, 
  Atom, 
  Wrench, 
  Laptop, 
  Calculator, 
  Brain, 
  Users, 
  Award, 
  BookOpen,
  Calendar,
  CheckCircle,
  Building
} from "lucide-react";
import { Department, Course, Faculty } from "@shared/schema";
import { Link } from "wouter";

export default function Academics() {
  const { data: departments, isLoading: departmentsLoading } = useQuery<Department[]>({
    queryKey: ["/api/departments"],
  });

  const { data: courses, isLoading: coursesLoading } = useQuery<Course[]>({
    queryKey: ["/api/courses"],
  });

  const { data: faculty, isLoading: facultyLoading } = useQuery<Faculty[]>({
    queryKey: ["/api/faculty"],
  });

  const programCategories = [
    {
      title: "Arts & Humanities",
      icon: GraduationCap,
      description: "English, Hindi, Political Science, Philosophy, Applied Psychology",
      color: "primary"
    },
    {
      title: "Commerce",
      icon: TrendingUp,
      description: "B.Com (Hons.), B.Com (Prog.), Business Management Studies",
      color: "accent"
    },
    {
      title: "Science",
      icon: Atom,
      description: "Mathematics, Statistics, Computer Science, Environmental Science",
      color: "secondary"
    },
    {
      title: "Vocational",
      icon: Wrench,
      description: "B.Voc courses focused on skill development and industry readiness",
      color: "primary"
    }
  ];

  const featuredDepartments = [
    {
      title: "Computer Science",
      icon: Laptop,
      description: "Established in 2013, our CS department features 5 modern air-conditioned computing labs and hosts research centers for Robotics & AI and Social Innovation.",
      faculty: "6 Assistant Professors",
      established: 2013
    },
    {
      title: "Mathematics",
      icon: Calculator,
      description: "Our Mathematics department, honoring our college's namesake Ramanujan, offers rigorous programs in pure and applied mathematics with modern teaching methodologies.",
      faculty: "Excellence in Teaching",
      established: 1958
    },
    {
      title: "Applied Psychology",
      icon: Brain,
      description: "Our Psychology department focuses on practical applications of psychological principles with specialized labs and research opportunities.",
      faculty: "Psychology Lab Available",
      established: 2010
    }
  ];

  return (
    <>
      {/* <Helmet>
        <title>Academics - Ramanujan College | Departments, Courses & Faculty - University of Delhi</title>
        <meta name="description" content="Explore academic excellence at Ramanujan College with 16+ undergraduate programs across Arts, Commerce, Science, and Vocational streams. Discover our departments, courses, and distinguished faculty." />
      </Helmet> */}

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif" data-testid="page-title">
                Academic Excellence
              </h1>
              <p className="text-xl opacity-90" data-testid="page-subtitle">
                Quality Education in Science, Commerce, and Arts Streams
              </p>
              <Badge className="mt-4 bg-accent text-accent-foreground" data-testid="cbcs-badge">
                H.S. 1st & 2nd Year (AHSEC)
              </Badge>
            </div>
          </div>
        </section>

        {/* Streams */}
        <section id="streams" className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 font-serif" data-testid="streams-title">
                Academic Streams
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Three comprehensive streams offering specialized education for H.S. 1st & 2nd Year students
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-8 hover:shadow-xl transition-shadow" data-testid="stream-arts">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                    <GraduationCap className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Arts Stream</h3>
                  <p className="text-muted-foreground mb-6">
                    Comprehensive humanities education covering languages, social sciences, and liberal arts subjects.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-primary mb-3">Core Subjects Include:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                      English, Assamese, Hindi
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                      Political Science
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                      History, Geography
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                      Economics, Education
                    </li>
                  </ul>
                </div>
              </Card>

              <Card className="p-8 hover:shadow-xl transition-shadow border-2 border-primary" data-testid="stream-commerce">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-accent rounded-lg flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-accent-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Commerce Stream</h3>
                  <p className="text-muted-foreground mb-6">
                    Business-focused curriculum preparing students for careers in commerce, accounting, and management.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-primary mb-3">Core Subjects Include:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                      Accountancy
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                      Business Studies
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                      Economics
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                      Mathematics/English
                    </li>
                  </ul>
                </div>
              </Card>

              <Card className="p-8 hover:shadow-xl transition-shadow" data-testid="stream-science">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Atom className="w-8 h-8 text-secondary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Science Stream</h3>
                  <p className="text-muted-foreground mb-6">
                    Strong foundation in sciences and mathematics for engineering and medical entrance preparation.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-primary mb-3">Core Subjects Include:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                      Physics, Chemistry
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                      Mathematics/Biology
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                      Computer Science (optional)
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                      English, Assamese
                    </li>
                  </ul>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Subjects */}
        <section id="subjects" className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 font-serif" data-testid="subjects-title">
                Subjects Offered
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Wide range of subjects across Arts, Commerce, and Science streams for comprehensive education
              </p>
            </div>

            {coursesLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="p-6">
                    <Skeleton className="h-4 w-3/4 mb-4" />
                    <Skeleton className="h-3 w-full mb-2" />
                    <Skeleton className="h-3 w-2/3 mb-4" />
                    <Skeleton className="h-8 w-24" />
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses && courses.length > 0 ? (
                  courses.map((course, index) => (
                    <Card key={course.id} className="p-6 hover:shadow-lg transition-shadow" data-testid={`course-${index}`}>
                      <CardHeader className="p-0 pb-4">
                        <CardTitle className="text-lg">{course.name}</CardTitle>
                        <Badge variant="outline">{course.code}</Badge>
                      </CardHeader>
                      <CardContent className="p-0">
                        <p className="text-sm text-muted-foreground mb-4">{course.description}</p>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm">
                            <Calendar className="w-4 h-4 mr-2 text-primary" />
                            Duration: {course.duration}
                          </div>
                          {course.seats && (
                            <div className="flex items-center text-sm">
                              <Users className="w-4 h-4 mr-2 text-primary" />
                              Seats: {course.seats}
                            </div>
                          )}
                        </div>
                        <Button variant="outline" size="sm" data-testid={`view-course-details-${index}`}>
                          View Syllabus
                        </Button>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <BookOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Subject Information</h3>
                    <p className="text-muted-foreground">
                      Detailed subject information will be available soon. Please check back later.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Teachers */}
        <section id="teachers" className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 font-serif" data-testid="teachers-title">
                Our Teachers
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Dedicated and qualified permanent faculty committed to student success and competitive exam preparation
              </p>
            </div>

            {facultyLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="p-6">
                    <Skeleton className="h-4 w-3/4 mb-4" />
                    <Skeleton className="h-3 w-full mb-2" />
                    <Skeleton className="h-3 w-2/3 mb-4" />
                    <Skeleton className="h-8 w-24" />
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {faculty && faculty.length > 0 ? (
                  faculty.slice(0, 9).map((member, index) => (
                    <Card key={member.id} className="p-6 hover:shadow-lg transition-shadow" data-testid={`faculty-${index}`}>
                      <CardHeader className="p-0 pb-4 text-center">
                        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                          <Users className="w-8 h-8 text-primary-foreground" />
                        </div>
                        <CardTitle className="text-lg">{member.name}</CardTitle>
                        <Badge variant="outline">{member.designation}</Badge>
                      </CardHeader>
                      <CardContent className="p-0 text-center">
                        <p className="text-sm text-muted-foreground mb-2">{member.qualification}</p>
                        {member.specialization && (
                          <p className="text-sm text-primary mb-4">{member.specialization}</p>
                        )}
                        {member.experience && (
                          <div className="flex items-center justify-center text-sm text-muted-foreground">
                            <Award className="w-4 h-4 mr-2" />
                            {member.experience} years experience
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <Users className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Teacher Information</h3>
                    <p className="text-muted-foreground">
                      Teacher profiles will be available soon. Please check back later.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Students */}
        <section id="students" className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 font-serif" data-testid="students-title">
                Student Life & Support
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Comprehensive support system for student success in academics and competitive examinations
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Regular Classes</h3>
                <p className="text-muted-foreground">
                  H.S. 1st & 2nd year regular classes with intensive coaching by permanent qualified faculty for comprehensive subject understanding.
                </p>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Entrance Preparation</h3>
                <p className="text-muted-foreground">
                  Special coaching for JEE (Mains & Advanced) and Medical entrance exams. Saturday entrance-based tests to ensure exam readiness.
                </p>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-secondary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Guardian Interaction</h3>
                <p className="text-muted-foreground">
                  Regular interaction with guardians for monitoring student progress and building rapport between teachers and students.
                </p>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Periodical Tests</h3>
                <p className="text-muted-foreground">
                  Regular tests to help students stay mentally alert and emotionally balanced for competitive examinations.
                </p>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4">
                  <GraduationCap className="w-6 h-6 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Career Counseling</h3>
                <p className="text-muted-foreground">
                  Professional career guidance to help students make informed decisions about their academic and professional future.
                </p>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-secondary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Moral Education</h3>
                <p className="text-muted-foreground">
                  Focus on character development and moral education to prepare students for real-life situations and challenges.
                </p>
              </Card>
            </div>

            <div className="bg-primary text-primary-foreground rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Student Guidelines</h3>
              <p className="text-lg mb-6 opacity-90">
                Students are expected to be sincere, dedicated, respectful, hardworking, self-reliant, social, obedient, punctual, and cultured. 
                We emphasize self-study and discourage dependency on private tuitions.
              </p>
              <Link href="/students">
                <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90" data-testid="view-student-resources">
                  View Student Resources →
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
