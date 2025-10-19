import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { User, Mail, Phone, Calendar, Shield, LogOut } from "lucide-react";

export default function Profile() {
  const { user, isLoading, logout } = useAuth();
  const [, navigate] = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    navigate("/login");
    return null;
  }

  const initials = user.fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const formatDate = (date: string | Date | null | undefined) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "student":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "teacher":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "management":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getApprovalBadgeColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <>
      <Helmet>
        <title>Profile - Ramanujan Junior College</title>
        <meta name="description" content="View your profile information at Ramanujan Junior College" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <Avatar className="h-24 w-24 border-4 border-background">
                  <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center sm:text-left flex-1">
                  <CardTitle className="text-2xl mb-2" data-testid="text-fullname">
                    {user.fullName}
                  </CardTitle>
                  <CardDescription className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    <Badge className={getRoleBadgeColor(user.role)} data-testid="badge-role">
                      <Shield className="w-3 h-3 mr-1" />
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </Badge>
                    <Badge className={getApprovalBadgeColor(user.approvalStatus)} data-testid="badge-approval">
                      {user.approvalStatus.charAt(0).toUpperCase() + user.approvalStatus.slice(1)}
                    </Badge>
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="gap-2"
                  data-testid="button-logout"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </div>
            </CardHeader>

            <CardContent className="mt-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Personal Information
                </h3>
                <div className="space-y-4">
                  {user.username && (
                    <div className="flex items-start gap-3">
                      <div className="min-w-[140px] text-sm font-medium text-muted-foreground">
                        Username:
                      </div>
                      <div className="text-sm" data-testid="text-username">{user.username}</div>
                    </div>
                  )}
                  
                  {user.email && (
                    <div className="flex items-start gap-3">
                      <div className="min-w-[140px] text-sm font-medium text-muted-foreground flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email:
                      </div>
                      <div className="text-sm" data-testid="text-email">{user.email}</div>
                    </div>
                  )}
                  
                  {user.phoneNumber && (
                    <div className="flex items-start gap-3">
                      <div className="min-w-[140px] text-sm font-medium text-muted-foreground flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Phone Number:
                      </div>
                      <div className="text-sm" data-testid="text-phone">{user.phoneNumber}</div>
                    </div>
                  )}

                  {user.createdAt && (
                    <div className="flex items-start gap-3">
                      <div className="min-w-[140px] text-sm font-medium text-muted-foreground flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Member Since:
                      </div>
                      <div className="text-sm" data-testid="text-created">{formatDate(user.createdAt)}</div>
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Account Details
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="min-w-[140px] text-sm font-medium text-muted-foreground">
                      Account ID:
                    </div>
                    <div className="text-sm font-mono bg-muted px-2 py-1 rounded" data-testid="text-id">
                      {user.id}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="min-w-[140px] text-sm font-medium text-muted-foreground">
                      Role:
                    </div>
                    <div className="text-sm" data-testid="text-role-detail">
                      {user.role === "student" && "Student - Access to academic resources and teacher ratings"}
                      {user.role === "teacher" && "Teacher - View ratings and manage academic content"}
                      {user.role === "management" && "Management - Full administrative access"}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="min-w-[140px] text-sm font-medium text-muted-foreground">
                      Approval Status:
                    </div>
                    <div className="text-sm" data-testid="text-approval-detail">
                      {user.approvalStatus === "approved" && "Your account is approved and fully active"}
                      {user.approvalStatus === "pending" && "Your account is awaiting approval from management"}
                      {user.approvalStatus === "rejected" && "Your account application was rejected"}
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  Need Help?
                </h4>
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  If you need to update your profile information or have any questions, please contact the college administration.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
