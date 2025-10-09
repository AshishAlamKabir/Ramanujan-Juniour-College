import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { Search, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Student } from "@shared/schema";

export default function Students() {
  const [yearFilter, setYearFilter] = useState<string>("all");
  const [streamFilter, setStreamFilter] = useState<string>("all");
  const [sectionFilter, setSectionFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentStudentsLimit, setCurrentStudentsLimit] = useState(8);
  const [passedStudentsLimit, setPassedStudentsLimit] = useState(8);

  const { data: currentStudents = [], isLoading: currentLoading } = useQuery<Student[]>({
    queryKey: ["/api/students?status=current"],
  });

  const { data: passedStudents = [], isLoading: passedLoading } = useQuery<Student[]>({
    queryKey: ["/api/students?status=passed"],
  });

  const filterStudents = (students: Student[]) => {
    return students.filter((student) => {
      const matchesYear = yearFilter === "all" || student.year === parseInt(yearFilter);
      const matchesStream = streamFilter === "all" || student.stream === streamFilter;
      const matchesSection = sectionFilter === "all" || student.section === sectionFilter;
      const matchesSearch = searchQuery === "" || 
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.studentId.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesYear && matchesStream && matchesSection && matchesSearch;
    });
  };

  const filteredCurrentStudents = filterStudents(currentStudents);
  const filteredPassedStudents = filterStudents(passedStudents);

  const StudentCard = ({ student }: { student: Student }) => (
    <Card className="overflow-hidden border-2 hover:shadow-lg transition-shadow" data-testid={`student-card-${student.id}`}>
      <CardContent className="p-4 text-center">
        <div className="relative inline-block mb-3">
          <img
            src={student.photoUrl || "https://via.placeholder.com/150"}
            alt={student.name}
            className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-gray-200 dark:border-gray-700"
            data-testid={`student-photo-${student.id}`}
          />
        </div>
        <div className="mb-2">
          <span className="inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold" data-testid={`student-rank-${student.id}`}>
            Rank: {student.rank || "N/A"}
          </span>
        </div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-1" data-testid={`student-name-${student.id}`}>
          {student.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400" data-testid={`student-id-${student.id}`}>
          Student ID: {student.studentId}
        </p>
      </CardContent>
    </Card>
  );

  const StudentsSection = ({ 
    title, 
    students, 
    limit, 
    onShowMore, 
    loading,
    testId 
  }: { 
    title: string; 
    students: Student[]; 
    limit: number; 
    onShowMore: () => void; 
    loading: boolean;
    testId: string;
  }) => (
    <div className="mb-12" data-testid={testId}>
      <div className="bg-gradient-to-r from-green-500 to-green-600 dark:from-green-700 dark:to-green-800 rounded-t-lg p-4">
        <h2 className="text-2xl font-bold text-white text-center" data-testid={`${testId}-title`}>{title}</h2>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-b-lg shadow-lg p-6">
        <div className="flex flex-wrap gap-4 mb-6 items-center">
          <Select value={yearFilter} onValueChange={setYearFilter}>
            <SelectTrigger className="w-32 bg-green-500 hover:bg-green-600 text-white font-semibold border-none" data-testid={`${testId}-year-filter`}>
              <SelectValue placeholder="YEAR" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">ALL YEARS</SelectItem>
              <SelectItem value="1">1st Year</SelectItem>
              <SelectItem value="2">2nd Year</SelectItem>
            </SelectContent>
          </Select>

          <Select value={streamFilter} onValueChange={setStreamFilter}>
            <SelectTrigger className="w-32 bg-green-500 hover:bg-green-600 text-white font-semibold border-none" data-testid={`${testId}-stream-filter`}>
              <SelectValue placeholder="STREAM" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">ALL STREAMS</SelectItem>
              <SelectItem value="SCIENCE">SCIENCE</SelectItem>
              <SelectItem value="COMMERCE">COMMERCE</SelectItem>
              <SelectItem value="ARTS">ARTS</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sectionFilter} onValueChange={setSectionFilter}>
            <SelectTrigger className="w-32 bg-green-500 hover:bg-green-600 text-white font-semibold border-none" data-testid={`${testId}-section-filter`}>
              <SelectValue placeholder="SECTION" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">ALL SECTIONS</SelectItem>
              <SelectItem value="A">Section A</SelectItem>
              <SelectItem value="B">Section B</SelectItem>
              <SelectItem value="C">Section C</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex-1 max-w-md ml-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="SEARCH STUDENTS"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10"
              data-testid={`${testId}-search`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 dark:bg-gray-700 h-48 rounded-lg"></div>
              </div>
            ))}
          </div>
        ) : students.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400" data-testid={`${testId}-no-students`}>No students found</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {students.slice(0, limit).map((student) => (
                <StudentCard key={student.id} student={student} />
              ))}
            </div>
            
            {students.length > limit && (
              <div className="text-center">
                <Button
                  onClick={onShowMore}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-2 rounded-full"
                  data-testid={`${testId}-show-more`}
                >
                  SHOW MORE →
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Students - Ramanujan Junior College</title>
        <meta name="description" content="Current and passed out students of Ramanujan Junior College" />
      </Helmet>

      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 dark:from-blue-800 dark:to-blue-950">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4" data-testid="page-title">Students</h1>
          <p className="text-xl opacity-90">Our Bright Minds</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <StudentsSection
          title="CURRENT STUDENTS"
          students={filteredCurrentStudents}
          limit={currentStudentsLimit}
          onShowMore={() => setCurrentStudentsLimit(currentStudentsLimit + 8)}
          loading={currentLoading}
          testId="current-students"
        />

        <StudentsSection
          title="PASSED OUT STUDENTS"
          students={filteredPassedStudents}
          limit={passedStudentsLimit}
          onShowMore={() => setPassedStudentsLimit(passedStudentsLimit + 8)}
          loading={passedLoading}
          testId="passed-students"
        />
      </div>
    </>
  );
}
