import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
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
import { UserPlus } from "lucide-react";
import { registerUserSchema } from "@shared/schema";
import type { RegisterUser } from "@shared/schema";

type SignupForm = RegisterUser;

export default function Signup() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  
  const form = useForm<SignupForm>({
    resolver: zodResolver(registerUserSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      password: "",
      role: "student",
      studentType: "present",
      existingStudentId: "",
      year: 1,
      section: "",
      rollNumber: "",
    },
  });

  const selectedRole = form.watch("role");
  const selectedStudentType = form.watch("studentType");

  const signupMutation = useMutation({
    mutationFn: async (data: SignupForm) => {
      const res = await apiRequest("POST", "/api/auth/register", data);
      return await res.json();
    },
    onSuccess: (response: any) => {
      toast({
        title: "Success",
        description: response.message || "Registration successful",
      });
      navigate("/login");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Registration failed",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: SignupForm) => {
    signupMutation.mutate(data);
  };

  return (
    <>
      <Helmet>
        <title>Sign Up - Ramanujan Junior College</title>
        <meta name="description" content="Create your Ramanujan Junior College account" />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-4">
              <UserPlus className="w-12 h-12 text-blue-600 dark:text-blue-400" />
            </div>
            <CardTitle className="text-2xl text-center" data-testid="signup-title">
              Create Account
            </CardTitle>
            <CardDescription className="text-center" data-testid="signup-subtitle">
              Register to access the college portal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name *</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="Enter your full name"
                          data-testid="input-fullname"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number *</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="Enter 10-digit phone number"
                          data-testid="input-phone"
                          maxLength={10}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email (Optional)</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          type="email"
                          placeholder="Enter your email"
                          data-testid="input-email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password *</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          type="password"
                          placeholder="Create a password (min. 6 characters)"
                          data-testid="input-password"
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
                      <FormLabel>User Type *</FormLabel>
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

                {selectedRole === "student" && (
                  <>
                    <FormField
                      control={form.control}
                      name="studentType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Student Status *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-student-type">
                                <SelectValue placeholder="Are you a present or passed-out student?" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="present" data-testid="option-present">Present Student</SelectItem>
                              <SelectItem value="passed" data-testid="option-passed">Passed Out Student</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {selectedStudentType === "passed" && (
                      <FormField
                        control={form.control}
                        name="existingStudentId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Existing Student ID *</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                placeholder="Enter your student ID"
                                data-testid="input-existing-studentid"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    {selectedStudentType === "present" && (
                      <>
                        <FormField
                          control={form.control}
                          name="year"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Year *</FormLabel>
                              <Select onValueChange={(value) => field.onChange(parseInt(value))} defaultValue={field.value?.toString()}>
                                <FormControl>
                                  <SelectTrigger data-testid="select-year">
                                    <SelectValue placeholder="Select your year" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="1" data-testid="option-year-1">1st Year</SelectItem>
                                  <SelectItem value="2" data-testid="option-year-2">2nd Year</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="section"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Section *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger data-testid="select-section">
                                    <SelectValue placeholder="Select your section" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="A" data-testid="option-section-a">Section A</SelectItem>
                                  <SelectItem value="B" data-testid="option-section-b">Section B</SelectItem>
                                  <SelectItem value="C" data-testid="option-section-c">Section C</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="rollNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Roll Number *</FormLabel>
                              <FormControl>
                                <Input 
                                  {...field} 
                                  placeholder="Enter your roll number"
                                  data-testid="input-rollnumber"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </>
                    )}
                  </>
                )}

                <p className="text-xs text-gray-500 dark:text-gray-400" data-testid="note-approval">
                  * Required fields. Note: Student and Teacher accounts require management approval before access.
                </p>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={signupMutation.isPending}
                  data-testid="button-signup"
                >
                  {signupMutation.isPending ? "Creating account..." : "Sign Up"}
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
              </span>
              <Link href="/login" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium" data-testid="link-login">
                Login here
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
