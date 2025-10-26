import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Link } from "wouter";
import { LogIn } from "lucide-react";
import { loginUserSchema } from "@shared/schema";
import type { LoginUser } from "@shared/schema";
import collegeLogo from "@assets/Screenshot 2025-10-12 163912_1760267377713.png";

type LoginForm = LoginUser;

export default function Login() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const form = useForm<LoginForm>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      identifier: "",
      role: "student",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginForm) => {
      const res = await apiRequest("POST", "/api/auth/login", data);
      return await res.json();
    },
    onSuccess: async (response: any) => {
      // Store JWT token in localStorage
      if (response.token) {
        localStorage.setItem("authToken", response.token);
      }
      
      toast({
        title: "Success",
        description: response.message || "Login successful",
      });
      
      // Invalidate queries
      await queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
      
      // Navigate to dashboard
      window.location.href = "/dashboard";
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Login failed",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: LoginForm) => {
    loginMutation.mutate(data);
  };

  return (
    <>
      <Helmet>
        <title>Login - Ramanujan Junior College</title>
        <meta name="description" content="Login to your Ramanujan Junior College account" />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 pb-4">
            <div className="flex items-center justify-center mb-3">
              <img 
                src={collegeLogo} 
                alt="Ramanujan Junior College" 
                className="w-16 h-16 object-contain"
              />
            </div>
            <CardTitle className="text-xl text-center" data-testid="login-title">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-center text-sm" data-testid="login-subtitle">
              Login to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                <FormField
                  control={form.control}
                  name="identifier"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number or Student ID</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="Enter phone number or student ID"
                          data-testid="input-identifier"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>User Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-role">
                            <SelectValue placeholder="Select your user type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="student" data-testid="option-student">Student</SelectItem>
                          <SelectItem value="teacher" data-testid="option-teacher">Teacher</SelectItem>
                          <SelectItem value="management" data-testid="option-management">Management</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          type="password" 
                          placeholder="Enter your password"
                          data-testid="input-password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loginMutation.isPending}
                  data-testid="button-login"
                >
                  {loginMutation.isPending ? "Logging in..." : "Login"}
                </Button>
              </form>
            </Form>

            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-md">
              <p className="text-xs font-semibold text-blue-800 dark:text-blue-200 mb-2">📋 Demo Accounts (For Testing)</p>
              <div className="space-y-1.5 text-xs text-blue-700 dark:text-blue-300">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Student:</span>
                  <span className="font-mono bg-white dark:bg-gray-800 px-1.5 py-0.5 rounded">1111111111 / RJC20251000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Teacher:</span>
                  <span className="font-mono bg-white dark:bg-gray-800 px-1.5 py-0.5 rounded">2222222222</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Management:</span>
                  <span className="font-mono bg-white dark:bg-gray-800 px-1.5 py-0.5 rounded">3333333333</span>
                </div>
                <div className="pt-1 border-t border-blue-200 dark:border-blue-800 mt-1.5">
                  <span className="font-medium">All passwords:</span>
                  <span className="font-mono bg-white dark:bg-gray-800 px-1.5 py-0.5 rounded ml-2">demo123</span>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                Don't have an account?{" "}
              </span>
              <Link href="/signup" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium" data-testid="link-signup">
                Sign up here
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
