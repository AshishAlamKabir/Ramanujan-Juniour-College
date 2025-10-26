import { useQuery, useMutation } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, User, UserCheck, UserX, Users, GraduationCap, Calendar, BookOpen, Image, Mail, ClipboardList, DollarSign, FileText, Clock, Phone, MapPin, Award, Briefcase, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { User as UserType, Faculty, Student, Event, Notice, GalleryImage, ContactForm, Timetable, AcademicCalendar, Admission, Payment } from "@shared/schema";
import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";

function RedirectToLogin() {
  const [, navigate] = useLocation();
  
  useEffect(() => {
    navigate("/login");
  }, [navigate]);
  
  return null;
}

export default function Dashboard() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  
  const { data: user, isLoading } = useQuery<UserType | null>({
    queryKey: ["/api/auth/me"],
  });

  const { data: studentDetails, isLoading: studentLoading } = useQuery<Student | null>({
    queryKey: [`/api/students/${user?.studentId}`],
    enabled: !!user?.studentId,
  });

  const { data: facultyDetails, isLoading: facultyLoading } = useQuery<Faculty | null>({
    queryKey: [`/api/faculty/${user?.facultyId}`],
    enabled: !!user?.facultyId,
  });

  const { data: pendingUsers = [], isLoading: isPendingLoading } = useQuery<UserType[]>({
    queryKey: ["/api/users/pending"],
    enabled: user?.role === "management",
  });

  const approvalMutation = useMutation({
    mutationFn: async ({ userId, status }: { userId: string; status: string }) => {
      const res = await apiRequest("PATCH", `/api/users/${userId}/approval`, { status });
      return await res.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["/api/users/pending"] });
      toast({
        title: "Success",
        description: `User ${variables.status === "approved" ? "approved" : "rejected"} successfully`,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update user status",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <RedirectToLogin />;
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // If user is management, show comprehensive dashboard
  if (user.role === "management" || user.role === "admin" || user.role === "principal") {
    return <ManagementDashboard user={user} onLogout={handleLogout} />;
  }

  // Regular user dashboard
  return (
    <>
      <Helmet>
        <title>Dashboard - Ramanujan Junior College</title>
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2" data-testid="dashboard-title">
              Welcome, {user.fullName}
            </h1>
            <p className="text-gray-600 dark:text-gray-400" data-testid="user-role">
              Role: <span className="capitalize font-medium">{user.role}</span>
            </p>
          </div>
          <Button onClick={handleLogout} variant="outline" data-testid="button-logout">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {user.approvalStatus === "pending" && (
          <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 mb-6">
            <CardHeader>
              <CardTitle className="text-yellow-800 dark:text-yellow-400">
                Approval Pending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-yellow-700 dark:text-yellow-300" data-testid="pending-message">
                Your account is awaiting approval from management. You will receive access once approved.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Account Details Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4" data-testid="section-account-details">Account Details</h2>
          
          {user.role === "student" && user.studentId ? (
            studentLoading ? (
              <Card>
                <CardContent className="p-6">
                  <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  </div>
                </CardContent>
              </Card>
            ) : studentDetails ? (
              <Card className="overflow-hidden" data-testid="card-student-details">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      {studentDetails.photoUrl && (
                        <img 
                          src={studentDetails.photoUrl} 
                          alt={studentDetails.name}
                          className="w-24 h-24 rounded-full border-4 border-white object-cover"
                          data-testid="student-photo"
                        />
                      )}
                      <div>
                        <CardTitle className="text-2xl mb-1" data-testid="student-name">{studentDetails.name}</CardTitle>
                        <p className="text-blue-100 text-lg" data-testid="student-studentid">Student ID: {studentDetails.studentId}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-white text-blue-600" data-testid="badge-student-status">
                      {studentDetails.status === "current" ? "Current Student" : "Passed Out"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <User className="w-5 h-5 text-blue-600" />
                        Personal Information
                      </h3>
                      <Separator />
                      <div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Roll Number:</span>
                        <p className="font-medium" data-testid="student-rollnumber">{studentDetails.rollNumber}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Gender:</span>
                        <p className="font-medium capitalize" data-testid="student-gender">{studentDetails.gender}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Date of Birth:</span>
                        <p className="font-medium" data-testid="student-dob">
                          {format(new Date(studentDetails.dateOfBirth), "PPP")}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <GraduationCap className="w-5 h-5 text-blue-600" />
                        Academic Information
                      </h3>
                      <Separator />
                      <div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Stream:</span>
                        <p className="font-medium uppercase" data-testid="student-stream">{studentDetails.stream}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Year:</span>
                        <p className="font-medium" data-testid="student-year">{studentDetails.year}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Section:</span>
                        <p className="font-medium uppercase" data-testid="student-section">{studentDetails.section}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Admission Year:</span>
                        <p className="font-medium" data-testid="student-admission-year">{studentDetails.admissionYear}</p>
                      </div>
                      {studentDetails.graduationYear && (
                        <div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">Graduation Year:</span>
                          <p className="font-medium" data-testid="student-graduation-year">{studentDetails.graduationYear}</p>
                        </div>
                      )}
                      {studentDetails.rank && (
                        <div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">Rank:</span>
                          <p className="font-medium flex items-center gap-1" data-testid="student-rank">
                            <Award className="w-4 h-4 text-yellow-500" />
                            {studentDetails.rank}
                          </p>
                        </div>
                      )}
                      {studentDetails.percentage && (
                        <div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">Percentage:</span>
                          <p className="font-medium" data-testid="student-percentage">{studentDetails.percentage}%</p>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Phone className="w-5 h-5 text-blue-600" />
                        Contact Information
                      </h3>
                      <Separator />
                      <div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Email:</span>
                        <p className="font-medium break-words" data-testid="student-email">{studentDetails.email}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Phone:</span>
                        <p className="font-medium" data-testid="student-contact">{studentDetails.contactNumber}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Address:</span>
                        <p className="font-medium" data-testid="student-address">{studentDetails.address}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card data-testid="card-basic-profile">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Profile Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Full Name:</span>
                    <p className="font-medium" data-testid="user-fullname">{user.fullName}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Email:</span>
                    <p className="font-medium" data-testid="user-email">{user.email || "Not provided"}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Phone:</span>
                    <p className="font-medium" data-testid="user-phone">{user.phoneNumber || "Not provided"}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Account Status:</span>
                    <p className="font-medium capitalize" data-testid="user-status">{user.approvalStatus}</p>
                  </div>
                </CardContent>
              </Card>
            )
          ) : user.role === "teacher" && user.facultyId ? (
            facultyLoading ? (
              <Card>
                <CardContent className="p-6">
                  <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  </div>
                </CardContent>
              </Card>
            ) : facultyDetails ? (
              <Card className="overflow-hidden" data-testid="card-faculty-details">
                <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl mb-1" data-testid="faculty-name">{facultyDetails.name}</CardTitle>
                      <p className="text-green-100 text-lg" data-testid="faculty-designation">{facultyDetails.designation}</p>
                    </div>
                    {facultyDetails.averageRating && parseFloat(facultyDetails.averageRating) > 0 && (
                      <Badge variant="secondary" className="bg-white text-green-600 flex items-center gap-1" data-testid="badge-faculty-rating">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        {parseFloat(facultyDetails.averageRating).toFixed(1)}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-green-600" />
                        Professional Information
                      </h3>
                      <Separator />
                      <div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Department:</span>
                        <p className="font-medium" data-testid="faculty-department">{facultyDetails.departmentId || "Not assigned"}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Subject:</span>
                        <p className="font-medium" data-testid="faculty-subject">{facultyDetails.subject || "Not specified"}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Specialization:</span>
                        <p className="font-medium" data-testid="faculty-specialization">{facultyDetails.specialization || "Not specified"}</p>
                      </div>
                      {facultyDetails.rankPosition && (
                        <div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">Rank Position:</span>
                          <p className="font-medium flex items-center gap-1" data-testid="faculty-rank">
                            <Award className="w-4 h-4 text-yellow-500" />
                            {facultyDetails.rankPosition}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-green-600" />
                        Qualifications
                      </h3>
                      <Separator />
                      <div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Qualification:</span>
                        <p className="font-medium" data-testid="faculty-qualification">{facultyDetails.qualification}</p>
                      </div>
                      {facultyDetails.experience && (
                        <div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">Experience:</span>
                          <p className="font-medium" data-testid="faculty-experience">{facultyDetails.experience} years</p>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Phone className="w-5 h-5 text-green-600" />
                        Contact Information
                      </h3>
                      <Separator />
                      <div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Email:</span>
                        <p className="font-medium break-words" data-testid="faculty-email">{facultyDetails.email || user.email || "Not provided"}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Phone:</span>
                        <p className="font-medium" data-testid="faculty-phone">{facultyDetails.phone || user.phoneNumber || "Not provided"}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card data-testid="card-basic-profile">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Profile Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Full Name:</span>
                    <p className="font-medium" data-testid="user-fullname">{user.fullName}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Email:</span>
                    <p className="font-medium" data-testid="user-email">{user.email || "Not provided"}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Phone:</span>
                    <p className="font-medium" data-testid="user-phone">{user.phoneNumber || "Not provided"}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Account Status:</span>
                    <p className="font-medium capitalize" data-testid="user-status">{user.approvalStatus}</p>
                  </div>
                </CardContent>
              </Card>
            )
          ) : (
            <Card data-testid="card-basic-profile">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Full Name:</span>
                  <p className="font-medium" data-testid="user-fullname">{user.fullName}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Email:</span>
                  <p className="font-medium" data-testid="user-email">{user.email || "Not provided"}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Phone:</span>
                  <p className="font-medium" data-testid="user-phone">{user.phoneNumber || "Not provided"}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Account Status:</span>
                  <p className="font-medium capitalize" data-testid="user-status">{user.approvalStatus}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}

// Management Dashboard Component
function ManagementDashboard({ user, onLogout }: { user: UserType; onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <>
      <Helmet>
        <title>Management Dashboard - Ramanujan Junior College</title>
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2" data-testid="dashboard-title">
              Management Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400" data-testid="user-name">
              Welcome, {user.fullName}
            </p>
          </div>
          <Button onClick={onLogout} variant="outline" data-testid="button-logout">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:grid-cols-11 gap-1" data-testid="tabs-list">
            <TabsTrigger value="overview" data-testid="tab-overview">Overview</TabsTrigger>
            <TabsTrigger value="teachers" data-testid="tab-teachers">Teachers</TabsTrigger>
            <TabsTrigger value="students" data-testid="tab-students">Students</TabsTrigger>
            <TabsTrigger value="events" data-testid="tab-events">Events</TabsTrigger>
            <TabsTrigger value="notices" data-testid="tab-notices">Notices</TabsTrigger>
            <TabsTrigger value="gallery" data-testid="tab-gallery">Gallery</TabsTrigger>
            <TabsTrigger value="contacts" data-testid="tab-contacts">Contacts</TabsTrigger>
            <TabsTrigger value="timetable" data-testid="tab-timetable">Timetable</TabsTrigger>
            <TabsTrigger value="calendar" data-testid="tab-calendar">Calendar</TabsTrigger>
            <TabsTrigger value="admissions" data-testid="tab-admissions">Admissions</TabsTrigger>
            <TabsTrigger value="payments" data-testid="tab-payments">Payments</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" data-testid="content-overview">
            <OverviewTab />
          </TabsContent>

          <TabsContent value="teachers" data-testid="content-teachers">
            <TeachersTab />
          </TabsContent>

          <TabsContent value="students" data-testid="content-students">
            <StudentsTab />
          </TabsContent>

          <TabsContent value="events" data-testid="content-events">
            <EventsTab />
          </TabsContent>

          <TabsContent value="notices" data-testid="content-notices">
            <NoticesTab />
          </TabsContent>

          <TabsContent value="gallery" data-testid="content-gallery">
            <GalleryTab />
          </TabsContent>

          <TabsContent value="contacts" data-testid="content-contacts">
            <ContactsTab />
          </TabsContent>

          <TabsContent value="timetable" data-testid="content-timetable">
            <TimetableTab />
          </TabsContent>

          <TabsContent value="calendar" data-testid="content-calendar">
            <CalendarTab />
          </TabsContent>

          <TabsContent value="admissions" data-testid="content-admissions">
            <AdmissionsTab />
          </TabsContent>

          <TabsContent value="payments" data-testid="content-payments">
            <PaymentsTab />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

// Overview Tab
function OverviewTab() {
  const { toast } = useToast();
  const { data: pendingUsers = [], isLoading: isPendingLoading } = useQuery<UserType[]>({
    queryKey: ["/api/users/pending"],
  });

  const { data: faculty = [] } = useQuery<Faculty[]>({ queryKey: ["/api/faculty"] });
  const { data: students = [] } = useQuery<Student[]>({ queryKey: ["/api/students"] });
  const { data: events = [] } = useQuery<Event[]>({ queryKey: ["/api/events"] });
  const { data: notices = [] } = useQuery<Notice[]>({ queryKey: ["/api/notices"] });

  const approvalMutation = useMutation({
    mutationFn: async ({ userId, status }: { userId: string; status: string }) => {
      const res = await apiRequest("PATCH", `/api/users/${userId}/approval`, { status });
      return await res.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["/api/users/pending"] });
      toast({
        title: "Success",
        description: `User ${variables.status === "approved" ? "approved" : "rejected"} successfully`,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update user status",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card data-testid="card-teachers-count">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Teachers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" data-testid="text-teachers-count">{faculty.length}</div>
          </CardContent>
        </Card>

        <Card data-testid="card-students-count">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" data-testid="text-students-count">{students.length}</div>
          </CardContent>
        </Card>

        <Card data-testid="card-events-count">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" data-testid="text-events-count">{events.length}</div>
          </CardContent>
        </Card>

        <Card data-testid="card-notices-count">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Notices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" data-testid="text-notices-count">{notices.length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Pending User Approvals
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isPendingLoading ? (
            <div className="animate-pulse space-y-3">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          ) : pendingUsers.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400" data-testid="no-pending-users">
              No pending approvals
            </p>
          ) : (
            <div className="space-y-4">
              {pendingUsers.map((pendingUser) => (
                <div
                  key={pendingUser.id}
                  className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                  data-testid={`pending-user-${pendingUser.id}`}
                >
                  <div className="flex-1">
                    <h3 className="font-semibold" data-testid={`text-name-${pendingUser.id}`}>
                      {pendingUser.fullName}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400" data-testid={`text-role-${pendingUser.id}`}>
                      Role: <span className="capitalize">{pendingUser.role}</span>
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400" data-testid={`text-phone-${pendingUser.id}`}>
                      Phone: {pendingUser.phoneNumber}
                    </p>
                    {pendingUser.studentId && (
                      <p className="text-sm text-gray-600 dark:text-gray-400" data-testid={`text-studentid-${pendingUser.id}`}>
                        Student ID: {pendingUser.studentId}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => approvalMutation.mutate({ userId: pendingUser.id, status: "approved" })}
                      disabled={approvalMutation.isPending}
                      data-testid={`button-approve-${pendingUser.id}`}
                    >
                      <UserCheck className="w-4 h-4 mr-1" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => approvalMutation.mutate({ userId: pendingUser.id, status: "rejected" })}
                      disabled={approvalMutation.isPending}
                      data-testid={`button-reject-${pendingUser.id}`}
                    >
                      <UserX className="w-4 h-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// Teachers Tab Component
function TeachersTab() {
  const { toast } = useToast();
  const { data: teachers = [], isLoading } = useQuery<Faculty[]>({
    queryKey: ["/api/faculty"],
  });
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/faculty/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/faculty"] });
      toast({ title: "Success", description: "Teacher deleted successfully" });
      setDeleteId(null);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete teacher", variant: "destructive" });
    },
  });

  if (isLoading) {
    return <div className="animate-pulse space-y-4"><div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div></div>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Teachers Management</CardTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total: {teachers.length}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teachers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-500" data-testid="no-teachers">
                    No teachers found
                  </TableCell>
                </TableRow>
              ) : (
                teachers.map((teacher) => (
                  <TableRow key={teacher.id} data-testid={`row-teacher-${teacher.id}`}>
                    <TableCell className="font-medium" data-testid={`text-name-${teacher.id}`}>{teacher.name}</TableCell>
                    <TableCell data-testid={`text-designation-${teacher.id}`}>{teacher.designation}</TableCell>
                    <TableCell data-testid={`text-department-${teacher.id}`}>{teacher.departmentId}</TableCell>
                    <TableCell data-testid={`text-email-${teacher.id}`}>{teacher.email || "N/A"}</TableCell>
                    <TableCell data-testid={`text-phone-${teacher.id}`}>{teacher.phone || "N/A"}</TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => setDeleteId(teacher.id)}
                        data-testid={`button-delete-${teacher.id}`}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the teacher.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-delete">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && deleteMutation.mutate(deleteId)}
              data-testid="button-confirm-delete"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}

// Students Tab Component
function StudentsTab() {
  const { toast } = useToast();
  const { data: students = [], isLoading } = useQuery<Student[]>({
    queryKey: ["/api/students"],
  });
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/students/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/students"] });
      toast({ title: "Success", description: "Student deleted successfully" });
      setDeleteId(null);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete student", variant: "destructive" });
    },
  });

  if (isLoading) {
    return <div className="animate-pulse space-y-4"><div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div></div>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Students Management</CardTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total: {students.length}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Stream</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Section</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-gray-500" data-testid="no-students">
                    No students found
                  </TableCell>
                </TableRow>
              ) : (
                students.map((student) => (
                  <TableRow key={student.id} data-testid={`row-student-${student.id}`}>
                    <TableCell className="font-medium" data-testid={`text-studentid-${student.id}`}>{student.studentId}</TableCell>
                    <TableCell data-testid={`text-name-${student.id}`}>{student.name}</TableCell>
                    <TableCell data-testid={`text-stream-${student.id}`}>{student.stream}</TableCell>
                    <TableCell data-testid={`text-year-${student.id}`}>{student.year}</TableCell>
                    <TableCell data-testid={`text-section-${student.id}`}>{student.section || "N/A"}</TableCell>
                    <TableCell>
                      <Badge variant={student.status === "active" ? "default" : "secondary"} data-testid={`badge-status-${student.id}`}>
                        {student.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => setDeleteId(student.id)}
                        data-testid={`button-delete-${student.id}`}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the student.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-delete">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && deleteMutation.mutate(deleteId)}
              data-testid="button-confirm-delete"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}

// Events Tab Component  
function EventsTab() {
  const { toast } = useToast();
  const { data: events = [], isLoading } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/events/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      toast({ title: "Success", description: "Event deleted successfully" });
      setDeleteId(null);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete event", variant: "destructive" });
    },
  });

  if (isLoading) {
    return <div className="animate-pulse space-y-4"><div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div></div>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Events Management</CardTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total: {events.length}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Venue</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-500" data-testid="no-events">
                    No events found
                  </TableCell>
                </TableRow>
              ) : (
                events.map((event) => (
                  <TableRow key={event.id} data-testid={`row-event-${event.id}`}>
                    <TableCell className="font-medium" data-testid={`text-title-${event.id}`}>{event.title}</TableCell>
                    <TableCell data-testid={`text-date-${event.id}`}>{new Date(event.eventDate).toLocaleDateString()}</TableCell>
                    <TableCell data-testid={`text-venue-${event.id}`}>{event.location || "N/A"}</TableCell>
                    <TableCell data-testid={`text-category-${event.id}`}>{event.category}</TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => setDeleteId(event.id)}
                        data-testid={`button-delete-${event.id}`}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the event.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-delete">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && deleteMutation.mutate(deleteId)}
              data-testid="button-confirm-delete"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}

// Notices Tab Component
function NoticesTab() {
  const { toast } = useToast();
  const { data: notices = [], isLoading } = useQuery<Notice[]>({
    queryKey: ["/api/notices"],
  });
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/notices/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/notices"] });
      toast({ title: "Success", description: "Notice deleted successfully" });
      setDeleteId(null);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete notice", variant: "destructive" });
    },
  });

  if (isLoading) {
    return <div className="animate-pulse space-y-4"><div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div></div>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Notices Management</CardTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total: {notices.length}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {notices.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-500" data-testid="no-notices">
                    No notices found
                  </TableCell>
                </TableRow>
              ) : (
                notices.map((notice) => (
                  <TableRow key={notice.id} data-testid={`row-notice-${notice.id}`}>
                    <TableCell className="font-medium" data-testid={`text-title-${notice.id}`}>{notice.title}</TableCell>
                    <TableCell data-testid={`text-date-${notice.id}`}>{notice.publishedAt ? new Date(notice.publishedAt).toLocaleDateString() : "N/A"}</TableCell>
                    <TableCell>
                      <Badge variant={notice.priority === "high" ? "destructive" : "default"} data-testid={`badge-priority-${notice.id}`}>
                        {notice.priority || "normal"}
                      </Badge>
                    </TableCell>
                    <TableCell data-testid={`text-audience-${notice.id}`}>{notice.category}</TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => setDeleteId(notice.id)}
                        data-testid={`button-delete-${notice.id}`}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the notice.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-delete">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && deleteMutation.mutate(deleteId)}
              data-testid="button-confirm-delete"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}

// Gallery Tab Component
function GalleryTab() {
  const { toast } = useToast();
  const { data: images = [], isLoading } = useQuery<GalleryImage[]>({
    queryKey: ["/api/gallery"],
  });
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/gallery/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/gallery"] });
      toast({ title: "Success", description: "Gallery image deleted successfully" });
      setDeleteId(null);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete gallery image", variant: "destructive" });
    },
  });

  if (isLoading) {
    return <div className="animate-pulse space-y-4"><div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div></div>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Gallery Management</CardTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total: {images.length}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {images.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-gray-500" data-testid="no-gallery">
                    No gallery images found
                  </TableCell>
                </TableRow>
              ) : (
                images.map((image) => (
                  <TableRow key={image.id} data-testid={`row-gallery-${image.id}`}>
                    <TableCell className="font-medium" data-testid={`text-title-${image.id}`}>{image.caption || "No caption"}</TableCell>
                    <TableCell data-testid={`text-category-${image.id}`}>Gallery</TableCell>
                    <TableCell data-testid={`text-date-${image.id}`}>{image.createdAt ? new Date(image.createdAt).toLocaleDateString() : "N/A"}</TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => setDeleteId(image.id)}
                        data-testid={`button-delete-${image.id}`}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the gallery image.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-delete">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && deleteMutation.mutate(deleteId)}
              data-testid="button-confirm-delete"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}

// Contacts Tab Component
function ContactsTab() {
  const { toast } = useToast();
  const { data: contacts = [], isLoading } = useQuery<ContactForm[]>({
    queryKey: ["/api/contact-forms"],
  });
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/contact-forms/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/contact-forms"] });
      toast({ title: "Success", description: "Contact form deleted successfully" });
      setDeleteId(null);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete contact form", variant: "destructive" });
    },
  });

  const statusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      await apiRequest("PATCH", `/api/contact-forms/${id}/status`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/contact-forms"] });
      toast({ title: "Success", description: "Status updated successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update status", variant: "destructive" });
    },
  });

  if (isLoading) {
    return <div className="animate-pulse space-y-4"><div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div></div>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Contact Forms</CardTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total: {contacts.length}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-500" data-testid="no-contacts">
                    No contact forms found
                  </TableCell>
                </TableRow>
              ) : (
                contacts.map((contact) => (
                  <TableRow key={contact.id} data-testid={`row-contact-${contact.id}`}>
                    <TableCell className="font-medium" data-testid={`text-name-${contact.id}`}>{contact.name}</TableCell>
                    <TableCell data-testid={`text-email-${contact.id}`}>{contact.email}</TableCell>
                    <TableCell data-testid={`text-subject-${contact.id}`}>{contact.subject}</TableCell>
                    <TableCell data-testid={`text-date-${contact.id}`}>{contact.submittedAt ? new Date(contact.submittedAt).toLocaleDateString() : "N/A"}</TableCell>
                    <TableCell>
                      <select
                        value={contact.status}
                        onChange={(e) => statusMutation.mutate({ id: contact.id, status: e.target.value })}
                        className="text-sm border rounded px-2 py-1"
                        data-testid={`select-status-${contact.id}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => setDeleteId(contact.id)}
                        data-testid={`button-delete-${contact.id}`}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the contact form.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-delete">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && deleteMutation.mutate(deleteId)}
              data-testid="button-confirm-delete"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}

// Timetable Tab Component
function TimetableTab() {
  const { toast } = useToast();
  const { data: timetables = [], isLoading } = useQuery<Timetable[]>({
    queryKey: ["/api/timetables"],
  });
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/timetables/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/timetables"] });
      toast({ title: "Success", description: "Timetable deleted successfully" });
      setDeleteId(null);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete timetable", variant: "destructive" });
    },
  });

  if (isLoading) {
    return <div className="animate-pulse space-y-4"><div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div></div>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Timetable Management</CardTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total: {timetables.length}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Stream</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Section</TableHead>
                <TableHead>Day</TableHead>
                <TableHead>Time Slot</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {timetables.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-gray-500" data-testid="no-timetables">
                    No timetables found
                  </TableCell>
                </TableRow>
              ) : (
                timetables.map((timetable) => (
                  <TableRow key={timetable.id} data-testid={`row-timetable-${timetable.id}`}>
                    <TableCell className="font-medium" data-testid={`text-stream-${timetable.id}`}>{timetable.stream}</TableCell>
                    <TableCell data-testid={`text-year-${timetable.id}`}>{timetable.year}</TableCell>
                    <TableCell data-testid={`text-section-${timetable.id}`}>{timetable.section || "N/A"}</TableCell>
                    <TableCell data-testid={`text-day-${timetable.id}`}>{timetable.day}</TableCell>
                    <TableCell data-testid={`text-period-${timetable.id}`}>{timetable.timeSlot}</TableCell>
                    <TableCell data-testid={`text-subject-${timetable.id}`}>{timetable.subject}</TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => setDeleteId(timetable.id)}
                        data-testid={`button-delete-${timetable.id}`}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the timetable entry.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-delete">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && deleteMutation.mutate(deleteId)}
              data-testid="button-confirm-delete"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}

// Calendar Tab Component
function CalendarTab() {
  const { toast } = useToast();
  const { data: calendars = [], isLoading } = useQuery<AcademicCalendar[]>({
    queryKey: ["/api/academic-calendar"],
  });
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/academic-calendar/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/academic-calendar"] });
      toast({ title: "Success", description: "Calendar entry deleted successfully" });
      setDeleteId(null);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete calendar entry", variant: "destructive" });
    },
  });

  if (isLoading) {
    return <div className="animate-pulse space-y-4"><div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div></div>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Academic Calendar</CardTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total: {calendars.length}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Academic Year</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {calendars.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-500" data-testid="no-calendar">
                    No calendar entries found
                  </TableCell>
                </TableRow>
              ) : (
                calendars.map((calendar) => (
                  <TableRow key={calendar.id} data-testid={`row-calendar-${calendar.id}`}>
                    <TableCell className="font-medium" data-testid={`text-title-${calendar.id}`}>{calendar.title}</TableCell>
                    <TableCell data-testid={`text-start-${calendar.id}`}>{new Date(calendar.startDate).toLocaleDateString()}</TableCell>
                    <TableCell data-testid={`text-end-${calendar.id}`}>{calendar.endDate ? new Date(calendar.endDate).toLocaleDateString() : "N/A"}</TableCell>
                    <TableCell data-testid={`text-type-${calendar.id}`}>{calendar.eventType}</TableCell>
                    <TableCell data-testid={`text-year-${calendar.id}`}>{calendar.academicYear}</TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => setDeleteId(calendar.id)}
                        data-testid={`button-delete-${calendar.id}`}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the calendar entry.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-delete">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && deleteMutation.mutate(deleteId)}
              data-testid="button-confirm-delete"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}

// Admissions Tab Component
function AdmissionsTab() {
  const { toast } = useToast();
  const { data: admissions = [], isLoading } = useQuery<Admission[]>({
    queryKey: ["/api/admissions"],
  });
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/admissions/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admissions"] });
      toast({ title: "Success", description: "Admission deleted successfully" });
      setDeleteId(null);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete admission", variant: "destructive" });
    },
  });

  const statusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      await apiRequest("PATCH", `/api/admissions/${id}/status`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admissions"] });
      toast({ title: "Success", description: "Status updated successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update status", variant: "destructive" });
    },
  });

  if (isLoading) {
    return <div className="animate-pulse space-y-4"><div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div></div>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Admissions Management</CardTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total: {admissions.length}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Stream</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {admissions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-gray-500" data-testid="no-admissions">
                    No admissions found
                  </TableCell>
                </TableRow>
              ) : (
                admissions.map((admission) => (
                  <TableRow key={admission.id} data-testid={`row-admission-${admission.id}`}>
                    <TableCell className="font-medium" data-testid={`text-name-${admission.id}`}>{admission.fullName}</TableCell>
                    <TableCell data-testid={`text-email-${admission.id}`}>{admission.email}</TableCell>
                    <TableCell data-testid={`text-phone-${admission.id}`}>{admission.phone}</TableCell>
                    <TableCell data-testid={`text-stream-${admission.id}`}>{admission.stream}</TableCell>
                    <TableCell data-testid={`text-date-${admission.id}`}>{admission.submittedAt ? new Date(admission.submittedAt).toLocaleDateString() : "N/A"}</TableCell>
                    <TableCell>
                      <select
                        value={admission.status}
                        onChange={(e) => statusMutation.mutate({ id: admission.id, status: e.target.value })}
                        className="text-sm border rounded px-2 py-1"
                        data-testid={`select-status-${admission.id}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="under-review">Under Review</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => setDeleteId(admission.id)}
                        data-testid={`button-delete-${admission.id}`}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the admission.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-delete">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && deleteMutation.mutate(deleteId)}
              data-testid="button-confirm-delete"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}

// Payments Tab Component
function PaymentsTab() {
  const { toast } = useToast();
  const { data: payments = [], isLoading } = useQuery<Payment[]>({
    queryKey: ["/api/payments/pending"],
  });

  const verifyMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("POST", `/api/payments/${id}/verify`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/payments/pending"] });
      toast({ title: "Success", description: "Payment verified successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to verify payment", variant: "destructive" });
    },
  });

  if (isLoading) {
    return <div className="animate-pulse space-y-4"><div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div></div>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Payment Verification</CardTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400">Pending: {payments.length}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student ID</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-500" data-testid="no-payments">
                    No pending payments
                  </TableCell>
                </TableRow>
              ) : (
                payments.map((payment) => (
                  <TableRow key={payment.id} data-testid={`row-payment-${payment.id}`}>
                    <TableCell className="font-medium" data-testid={`text-studentid-${payment.id}`}>{payment.studentId}</TableCell>
                    <TableCell data-testid={`text-amount-${payment.id}`}>₹{parseFloat(payment.amount).toFixed(2)}</TableCell>
                    <TableCell data-testid={`text-date-${payment.id}`}>{payment.paidAt ? new Date(payment.paidAt).toLocaleDateString() : "N/A"}</TableCell>
                    <TableCell data-testid={`text-method-${payment.id}`}>{payment.paymentMethod || "N/A"}</TableCell>
                    <TableCell data-testid={`text-transaction-${payment.id}`}>{payment.referenceId || "N/A"}</TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        onClick={() => verifyMutation.mutate(payment.id)}
                        disabled={verifyMutation.isPending}
                        data-testid={`button-verify-${payment.id}`}
                      >
                        Verify
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
