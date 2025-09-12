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
                Comprehensive Programs Under Choice Based Credit System
              </p>
              <Badge className="mt-4 bg-accent text-accent-foreground" data-testid="cbcs-badge">
                CBCS Framework
              </Badge>
            </div>
          </div>
        </section>

        {/* Program Categories */}
        <section id="programs" className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 font-serif" data-testid="programs-title">
                Academic Programs
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Explore our comprehensive range of undergraduate programs designed to provide 
                quality education and prepare students for successful careers.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {programCategories.map((category, index) => (
                <Card key={category.title} className="hover:shadow-lg transition-shadow" data-testid={`program-category-${index}`}>
                  <CardContent className="p-6 text-center">
                    <div className={`w-12 h-12 bg-${category.color} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                      <category.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className="font-semibold mb-2">{category.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
                    <Button variant="link" className="text-primary p-0 h-auto font-medium hover:underline" data-testid={`explore-${category.title.toLowerCase().replace(/\s+/g, '-')}`}>
                      Explore Programs →
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Departments */}
        <section id="departments" className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 font-serif" data-testid="departments-title">
                Our Departments
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                18 academic departments offering specialized education and research opportunities
              </p>
            </div>

            {departmentsLoading ? (
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
              <>
                {/* Featured Departments */}
                <div className="mb-12">
                  <h3 className="text-2xl font-semibold mb-8 text-center">Featured Departments</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredDepartments.map((dept, index) => (
                      <Card key={dept.title} className="p-6" data-testid={`featured-department-${index}`}>
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                            <dept.icon className="w-5 h-5 text-primary-foreground" />
                          </div>
                          <h4 className="text-lg font-semibold">{dept.title}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">{dept.description}</p>
                        <div className="flex items-center text-sm text-muted-foreground mb-4">
                          <Users className="w-4 h-4 mr-2" />
                          {dept.faculty}
                        </div>
                        <Button variant="link" className="text-primary p-0 h-auto font-medium hover:underline" data-testid={`view-department-${dept.title.toLowerCase().replace(/\s+/g, '-')}`}>
                          View Department →
                        </Button>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* All Departments */}
                {departments && departments.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-semibold mb-8 text-center">All Departments</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {departments.map((dept, index) => (
                        <Card key={dept.id} className="p-6 hover:shadow-lg transition-shadow" data-testid={`department-${index}`}>
                          <CardHeader className="p-0 pb-4">
                            <CardTitle className="flex items-center text-lg">
                              <Building className="w-5 h-5 mr-2 text-primary" />
                              {dept.name}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="p-0">
                            <p className="text-sm text-muted-foreground mb-4">{dept.description}</p>
                            {dept.established && (
                              <div className="flex items-center text-sm text-muted-foreground mb-2">
                                <Calendar className="w-4 h-4 mr-2" />
                                Established: {dept.established}
                              </div>
                            )}
                            {dept.facultyCount && dept.facultyCount > 0 && (
                              <div className="flex items-center text-sm text-muted-foreground mb-4">
                                <Users className="w-4 h-4 mr-2" />
                                {dept.facultyCount} Faculty Members
                              </div>
                            )}
                            <Button variant="outline" size="sm" data-testid={`view-dept-details-${index}`}>
                              View Details
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* Courses */}
        <section id="courses" className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 font-serif" data-testid="courses-title">
                Course Catalog
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                16+ undergraduate programs designed under the Choice Based Credit System
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
                    <h3 className="text-xl font-semibold mb-2">Course Information</h3>
                    <p className="text-muted-foreground">
                      Course details will be available soon. Please check back later.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Faculty */}
        <section id="faculty" className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 font-serif" data-testid="faculty-title">
                Our Faculty
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Distinguished educators and researchers committed to academic excellence
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
                    <h3 className="text-xl font-semibold mb-2">Faculty Information</h3>
                    <p className="text-muted-foreground">
                      Faculty profiles will be available soon. Please check back later.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Academic Resources */}
        <section id="calendar" className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 font-serif" data-testid="resources-title">
                Academic Resources
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Essential resources to support your academic journey
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-primary text-primary-foreground p-8">
                <h3 className="text-xl font-semibold mb-4">Academic Framework</h3>
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
                <Button 
                  className="mt-6 bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                  data-testid="view-academic-calendar"
                >
                  View Academic Calendar
                </Button>
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
                  <Button 
                    className="mt-6 bg-accent-foreground text-accent hover:bg-accent-foreground/90"
                    data-testid="student-resources"
                  >
                    Student Resources
                  </Button>
                </Link>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
