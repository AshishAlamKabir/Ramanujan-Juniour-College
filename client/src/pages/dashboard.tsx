import { useQuery, useMutation } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut, User, UserCheck, UserX, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { User as UserType } from "@shared/schema";

export default function Dashboard() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  
  const { data: user, isLoading } = useQuery<UserType | null>({
    queryKey: ["/api/auth/me"],
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
    navigate("/login");
    return null;
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card data-testid="card-profile">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Email:</span>
                <p className="font-medium" data-testid="user-email">{user.email || "Not provided"}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Phone:</span>
                <p className="font-medium" data-testid="user-phone">{user.phoneNumber || "Not provided"}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Status:</span>
                <p className="font-medium capitalize" data-testid="user-status">{user.approvalStatus}</p>
              </div>
            </CardContent>
          </Card>

          {user.approvalStatus === "pending" && (
            <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
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

          {user.role === "student" && user.studentId && (
            <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="text-blue-800 dark:text-blue-400">
                  Student Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <span className="text-sm text-blue-700 dark:text-blue-300">Student ID:</span>
                  <p className="font-bold text-lg text-blue-900 dark:text-blue-100" data-testid="student-id">
                    {user.studentId}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {user.role === "management" && (
          <div className="mt-8">
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
        )}
      </div>
    </>
  );
}
