import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { DollarSign, Upload, CheckCircle, Clock } from "lucide-react";
import type { StudentDue, Payment, User } from "@shared/schema";

const paymentSchema = z.object({
  dueId: z.string(),
  amount: z.string(),
  referenceId: z.string().min(1, "Payment reference ID is required"),
  screenshotUrl: z.string().url("Please enter a valid URL").optional(),
});

type PaymentForm = z.infer<typeof paymentSchema>;

export default function Payments() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedDue, setSelectedDue] = useState<StudentDue | null>(null);

  const { data: user } = useQuery<User>({
    queryKey: ["/api/auth/me"],
  });

  const { data: dues, isLoading: duesLoading } = useQuery<StudentDue[]>({
    queryKey: [`/api/dues/student/${user?.studentId}`],
    enabled: !!user?.studentId,
  });

  const { data: payments } = useQuery<Payment[]>({
    queryKey: [`/api/payments/student/${user?.studentId}`],
    enabled: !!user?.studentId,
  });

  const form = useForm<PaymentForm>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      dueId: "",
      amount: "",
      referenceId: "",
      screenshotUrl: "",
    },
  });

  const paymentMutation = useMutation({
    mutationFn: async (data: PaymentForm) => {
      const res = await apiRequest("POST", "/api/payments", {
        ...data,
        studentId: user?.studentId,
      });
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Payment submitted for verification",
      });
      queryClient.invalidateQueries({ queryKey: [`/api/dues/student/${user?.studentId}`] });
      queryClient.invalidateQueries({ queryKey: [`/api/payments/student/${user?.studentId}`] });
      setSelectedDue(null);
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit payment",
        variant: "destructive",
      });
    },
  });

  const handlePayDue = (due: StudentDue) => {
    setSelectedDue(due);
    form.setValue("dueId", due.id);
    form.setValue("amount", due.amount);
  };

  const onSubmit = (data: PaymentForm) => {
    paymentMutation.mutate(data);
  };

  const getStatusBadge = (status: string) => {
    const colors: { [key: string]: string } = {
      pending: "bg-yellow-500",
      paid: "bg-green-500",
      verified: "bg-blue-500",
    };
    return (
      <Badge className={`${colors[status] || "bg-gray-500"} text-white`}>
        {status}
      </Badge>
    );
  };

  if (duesLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
          <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Fee Payments - Ramanujan Junior College</title>
      </Helmet>

      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 dark:from-blue-800 dark:to-blue-950">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4" data-testid="page-title">Fee Payments</h1>
          <p className="text-xl opacity-90" data-testid="page-subtitle">
            View and manage your fee payments
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pending Dues */}
          <div>
            <h2 className="text-2xl font-bold mb-6" data-testid="dues-title">Pending Dues</h2>
            
            {/* UPI Payment Info */}
            <Card className="mb-6 bg-blue-50 dark:bg-blue-900/20">
              <CardHeader>
                <CardTitle className="text-lg">Payment Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">UPI ID:</p>
                  <p className="font-mono font-bold" data-testid="upi-id">college@upi</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Scan QR Code or use the UPI ID above to make payment
                  </p>
                </div>
              </CardContent>
            </Card>

            {!dues || dues.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400" data-testid="no-dues">
                    No pending dues
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {dues.map((due) => (
                  <Card key={due.id} data-testid={`due-card-${due.id}`}>
                    <CardContent className="py-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold" data-testid={`due-type-${due.id}`}>
                            {due.dueType}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400" data-testid={`due-desc-${due.id}`}>
                            {due.description}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Due Date: {new Date(due.dueDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right space-y-2">
                          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400" data-testid={`due-amount-${due.id}`}>
                            ₹{due.amount}
                          </p>
                          {getStatusBadge(due.status)}
                          {due.status === "pending" && (
                            <Button
                              size="sm"
                              onClick={() => handlePayDue(due)}
                              data-testid={`button-pay-${due.id}`}
                            >
                              Pay Now
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Payment Submission Form */}
          <div>
            <h2 className="text-2xl font-bold mb-6" data-testid="payment-form-title">
              Submit Payment
            </h2>
            
            {selectedDue ? (
              <Card>
                <CardHeader>
                  <CardTitle data-testid="selected-due-title">
                    {selectedDue.dueType}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Amount to Pay:</p>
                        <p className="text-2xl font-bold" data-testid="payment-amount">
                          ₹{selectedDue.amount}
                        </p>
                      </div>

                      <FormField
                        control={form.control}
                        name="referenceId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Payment Reference ID *</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Enter UPI transaction reference ID"
                                data-testid="input-reference"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="screenshotUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Payment Screenshot URL (Optional)</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Upload screenshot and paste URL here"
                                data-testid="input-screenshot"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex gap-2">
                        <Button
                          type="submit"
                          className="flex-1"
                          disabled={paymentMutation.isPending}
                          data-testid="button-submit-payment"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          {paymentMutation.isPending ? "Submitting..." : "Submit Payment"}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setSelectedDue(null)}
                          data-testid="button-cancel"
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400" data-testid="select-due-message">
                    Select a due from the left to make a payment
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Payment History */}
            {payments && payments.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4" data-testid="payment-history-title">
                  Payment History
                </h3>
                <div className="space-y-3">
                  {payments.slice(0, 5).map((payment) => (
                    <Card key={payment.id} data-testid={`payment-${payment.id}`}>
                      <CardContent className="py-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium" data-testid={`payment-ref-${payment.id}`}>
                              Ref: {payment.referenceId}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              ₹{payment.amount}
                            </p>
                          </div>
                          {getStatusBadge(payment.status)}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
