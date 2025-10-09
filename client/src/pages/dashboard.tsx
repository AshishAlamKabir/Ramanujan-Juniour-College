import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import type { User as UserType } from "@shared/schema";

export default function Dashboard() {
  const [, navigate] = useLocation();
  
  const { data: user, isLoading } = useQuery<UserType | null>({
    queryKey: ["/api/auth/me"],
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
                  Your account is awaiting approval from an administrator. You will receive access once approved.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
