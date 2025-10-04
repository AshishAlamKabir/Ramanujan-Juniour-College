import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap,
  User
} from "lucide-react";
import { Student } from "@shared/schema";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Students() {
  const [streamFilter, setStreamFilter] = useState<string>("all");
  const [sectionFilter, setSectionFilter] = useState<string>("all");
  const [yearFilter, setYearFilter] = useState<string>("all");

  const buildQueryKey = () => {
    const params: Record<string, string> = {};
    if (streamFilter !== "all") params.stream = streamFilter;
    if (sectionFilter !== "all") params.section = sectionFilter;
    if (yearFilter !== "all") params.year = yearFilter;
    
    const queryString = Object.keys(params).length > 0 
      ? `?${new URLSearchParams(params).toString()}` 
      : '';
    
    return `/api/students${queryString}`;
  };

  const { data: students, isLoading } = useQuery<Student[]>({
    queryKey: ['/api/students', streamFilter, sectionFilter, yearFilter],
    queryFn: async () => {
      const response = await fetch(buildQueryKey());
      if (!response.ok) throw new Error('Failed to fetch students');
      return response.json();
    }
  });

  const allStudents = useQuery<Student[]>({
    queryKey: ['/api/students'],
  });

  const streams = Array.from(new Set(allStudents.data?.map(s => s.stream) || []));
  const sections = Array.from(new Set(allStudents.data?.map(s => s.section) || []));
  const years = Array.from(new Set(allStudents.data?.map(s => s.year) || []));

  const currentStudents = students?.filter(s => !s.graduationYear);
  const passedOutStudents = students?.filter(s => s.graduationYear);

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4" data-testid="text-page-title">Students Directory</h1>
          <p className="text-lg opacity-90">Ramanujan Junior College Student Database</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Filter Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Stream</label>
                <Select value={streamFilter} onValueChange={setStreamFilter}>
                  <SelectTrigger data-testid="select-stream-filter">
                    <SelectValue placeholder="All Streams" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Streams</SelectItem>
                    {streams.map(stream => (
                      <SelectItem key={stream} value={stream}>{stream}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Section</label>
                <Select value={sectionFilter} onValueChange={setSectionFilter}>
                  <SelectTrigger data-testid="select-section-filter">
                    <SelectValue placeholder="All Sections" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sections</SelectItem>
                    {sections.map(section => (
                      <SelectItem key={section} value={section}>{section}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Year</label>
                <Select value={yearFilter} onValueChange={setYearFilter}>
                  <SelectTrigger data-testid="select-year-filter">
                    <SelectValue placeholder="All Years" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Years</SelectItem>
                    {years.map(year => (
                      <SelectItem key={year} value={year.toString()}>{year === 1 ? '1st Year' : year === 2 ? '2nd Year' : `${year}th Year`}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading students...</p>
          </div>
        ) : (
          <>
            <section className="mb-12">
              <div className="mb-6">
                <h2 className="text-3xl font-bold mb-2">Current Students</h2>
                <p className="text-muted-foreground">
                  {currentStudents?.length || 0} student{currentStudents?.length !== 1 ? 's' : ''} enrolled
                </p>
              </div>

              {currentStudents && currentStudents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {currentStudents.map(student => (
                    <Card key={student.id} className="hover:shadow-lg transition-shadow" data-testid={`card-student-${student.id}`}>
                      <CardContent className="pt-6">
                        <div className="flex flex-col items-center text-center">
                          <Avatar className="h-24 w-24 mb-4">
                            <AvatarImage src={student.photoUrl || undefined} alt={student.name} />
                            <AvatarFallback className="bg-blue-100 text-blue-600 text-xl">
                              <User className="h-12 w-12" />
                            </AvatarFallback>
                          </Avatar>
                          
                          <h3 className="font-semibold text-lg mb-1" data-testid={`text-name-${student.id}`}>
                            {student.name}
                          </h3>
                          
                          <div className="space-y-1 text-sm text-muted-foreground mb-3">
                            <p data-testid={`text-rollnumber-${student.id}`}>Roll: {student.rollNumber}</p>
                            <p data-testid={`text-studentid-${student.id}`}>ID: {student.studentId}</p>
                          </div>

                          <div className="flex flex-wrap gap-2 justify-center">
                            <Badge variant="secondary" data-testid={`badge-stream-${student.id}`}>
                              {student.stream}
                            </Badge>
                            <Badge variant="outline" data-testid={`badge-section-${student.id}`}>
                              Sec {student.section}
                            </Badge>
                            <Badge variant="outline" data-testid={`badge-year-${student.id}`}>
                              {student.year === 1 ? '1st Year' : student.year === 2 ? '2nd Year' : `${student.year}th Year`}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="py-12 text-center">
                    <User className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">No current students found with the selected filters.</p>
                  </CardContent>
                </Card>
              )}
            </section>

            <section>
              <div className="mb-6">
                <h2 className="text-3xl font-bold mb-2">Passed Out Students</h2>
                <p className="text-muted-foreground">
                  {passedOutStudents?.length || 0} student{passedOutStudents?.length !== 1 ? 's' : ''} graduated
                </p>
              </div>

              {passedOutStudents && passedOutStudents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {passedOutStudents.map(student => (
                    <Card key={student.id} className="hover:shadow-lg transition-shadow" data-testid={`card-student-${student.id}`}>
                      <CardContent className="pt-6">
                        <div className="flex flex-col items-center text-center">
                          <Avatar className="h-24 w-24 mb-4">
                            <AvatarImage src={student.photoUrl || undefined} alt={student.name} />
                            <AvatarFallback className="bg-green-100 text-green-600 text-xl">
                              <User className="h-12 w-12" />
                            </AvatarFallback>
                          </Avatar>
                          
                          <h3 className="font-semibold text-lg mb-1" data-testid={`text-name-${student.id}`}>
                            {student.name}
                          </h3>
                          
                          <div className="space-y-1 text-sm text-muted-foreground mb-3">
                            <p data-testid={`text-rollnumber-${student.id}`}>Roll: {student.rollNumber}</p>
                            <p data-testid={`text-studentid-${student.id}`}>ID: {student.studentId}</p>
                            {student.percentage && (
                              <p className="font-semibold text-green-600" data-testid={`text-percentage-${student.id}`}>
                                2nd Year: {student.percentage}
                              </p>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-2 justify-center">
                            <Badge variant="secondary" data-testid={`badge-stream-${student.id}`}>
                              {student.stream}
                            </Badge>
                            <Badge variant="outline" data-testid={`badge-section-${student.id}`}>
                              Sec {student.section}
                            </Badge>
                            {student.graduationYear && (
                              <Badge className="bg-green-600 hover:bg-green-700" data-testid={`badge-graduation-${student.id}`}>
                                Class of {student.graduationYear}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="py-12 text-center">
                    <GraduationCap className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">No passed out students found with the selected filters.</p>
                  </CardContent>
                </Card>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
}
