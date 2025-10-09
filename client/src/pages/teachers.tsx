import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, Phone, Mail, Award } from "lucide-react";
import type { Faculty } from "@shared/schema";

export default function Teachers() {
  const { data: faculty, isLoading } = useQuery<Faculty[]>({
    queryKey: ["/api/faculty/ranked"],
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return "bg-yellow-500 text-white";
    if (rank === 2) return "bg-gray-400 text-white";
    if (rank === 3) return "bg-orange-600 text-white";
    return "bg-blue-500 text-white";
  };

  const getRankIcon = (rank: number) => {
    if (rank <= 3) return <Trophy className="w-4 h-4" />;
    return <Award className="w-4 h-4" />;
  };

  return (
    <>
      <Helmet>
        <title>Our Teachers - Ramanujan Junior College</title>
        <meta 
          name="description" 
          content="Meet our dedicated and highly qualified teaching staff at Ramanujan Junior College, ranked by student ratings." 
        />
      </Helmet>

      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 dark:from-blue-800 dark:to-blue-950">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4" data-testid="page-title">Our Teachers</h1>
          <p className="text-xl opacity-90" data-testid="page-subtitle">
            Excellence in Education
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <p className="text-gray-600 dark:text-gray-400" data-testid="info-text">
            Our teachers are ranked based on student ratings and feedback. The rankings reflect their dedication, teaching excellence, and student engagement.
          </p>
        </div>

        {!faculty || faculty.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-500 dark:text-gray-400" data-testid="no-teachers-text">
                No ranked teachers available yet.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {faculty.map((teacher) => (
              <Card 
                key={teacher.id} 
                className="hover:shadow-lg transition-shadow duration-200"
                data-testid={`teacher-card-${teacher.id}`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg" data-testid={`teacher-name-${teacher.id}`}>
                      {teacher.name}
                    </CardTitle>
                    {teacher.rankPosition && (
                      <Badge 
                        className={`${getRankBadgeColor(teacher.rankPosition)} flex items-center gap-1`}
                        data-testid={`teacher-rank-${teacher.id}`}
                      >
                        {getRankIcon(teacher.rankPosition)}
                        Rank {teacher.rankPosition}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400" data-testid={`teacher-designation-${teacher.id}`}>
                    {teacher.designation}
                  </p>
                </CardHeader>
                <CardContent className="space-y-3">
                  {teacher.subject && (
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm font-medium" data-testid={`teacher-subject-${teacher.id}`}>
                        {teacher.subject}
                      </span>
                    </div>
                  )}
                  
                  {teacher.qualification && (
                    <div className="text-sm text-gray-600 dark:text-gray-400" data-testid={`teacher-qualification-${teacher.id}`}>
                      <strong>Qualification:</strong> {teacher.qualification}
                    </div>
                  )}
                  
                  {teacher.experience && (
                    <div className="text-sm text-gray-600 dark:text-gray-400" data-testid={`teacher-experience-${teacher.id}`}>
                      <strong>Experience:</strong> {teacher.experience} years
                    </div>
                  )}
                  
                  {teacher.averageRating && parseFloat(teacher.averageRating) > 0 && (
                    <div className="flex items-center gap-2 pt-2 border-t dark:border-gray-700">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-semibold" data-testid={`teacher-rating-${teacher.id}`}>
                        Rating: {parseFloat(teacher.averageRating).toFixed(1)} / 5.0
                      </span>
                    </div>
                  )}

                  <div className="space-y-1 pt-2 border-t dark:border-gray-700">
                    {teacher.phone && (
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Phone className="w-3 h-3" />
                        <span data-testid={`teacher-phone-${teacher.id}`}>{teacher.phone}</span>
                      </div>
                    )}
                    {teacher.email && (
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Mail className="w-3 h-3" />
                        <span data-testid={`teacher-email-${teacher.id}`}>{teacher.email}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
