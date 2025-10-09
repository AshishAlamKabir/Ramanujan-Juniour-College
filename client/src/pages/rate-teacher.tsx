import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Star, CheckCircle } from "lucide-react";
import type { RatingLink, Faculty } from "@shared/schema";

const ratingSchema = z.object({
  ratingValue: z.number().min(1).max(5),
  comment: z.string().optional(),
});

type RatingForm = z.infer<typeof ratingSchema>;

export default function RateTeacher() {
  const [, params] = useRoute("/rate/:token");
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  
  const { data: link, isLoading } = useQuery<RatingLink>({
    queryKey: [`/api/rating-links/${params?.token}`],
    enabled: !!params?.token,
  });

  const { data: faculty } = useQuery<Faculty>({
    queryKey: [`/api/faculty/${link?.facultyId}`],
    enabled: !!link?.facultyId,
  });

  const form = useForm<RatingForm>({
    resolver: zodResolver(ratingSchema),
    defaultValues: {
      ratingValue: 0,
      comment: "",
    },
  });

  const ratingMutation = useMutation({
    mutationFn: async (data: RatingForm) => {
      const res = await apiRequest("POST", "/api/ratings", {
        ...data,
        facultyId: link?.facultyId,
        ratingLinkId: link?.id,
      });
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Your rating has been submitted successfully!",
      });
      setSubmitted(true);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit rating",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded mb-4 mx-auto"></div>
          <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!link || !link.isActive) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <Card className="max-w-md">
          <CardContent className="py-12 text-center">
            <p className="text-red-600 dark:text-red-400" data-testid="error-message">
              Invalid or inactive rating link.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <Card className="max-w-md">
          <CardContent className="py-12 text-center space-y-4">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
            <h2 className="text-2xl font-bold" data-testid="success-title">Thank You!</h2>
            <p className="text-gray-600 dark:text-gray-400" data-testid="success-message">
              Your rating has been submitted successfully. Your feedback helps us improve.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const onSubmit = (data: RatingForm) => {
    ratingMutation.mutate(data);
  };

  return (
    <>
      <Helmet>
        <title>Rate Teacher - Ramanujan Junior College</title>
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="text-2xl" data-testid="rating-title">
              Rate Teacher
            </CardTitle>
            <CardDescription data-testid="teacher-name">
              {faculty ? `${faculty.name} - ${faculty.subject || faculty.specialization}` : "Loading..."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="ratingValue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rating (1-5 stars) *</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={(value) => field.onChange(parseInt(value))}
                          className="flex gap-2"
                          data-testid="rating-stars"
                        >
                          {[1, 2, 3, 4, 5].map((value) => (
                            <div key={value} className="flex items-center space-x-1">
                              <RadioGroupItem value={value.toString()} id={`rating-${value}`} />
                              <Label htmlFor={`rating-${value}`} className="flex items-center cursor-pointer">
                                <Star
                                  className={`w-6 h-6 ${
                                    field.value >= value
                                      ? "text-yellow-500 fill-yellow-500"
                                      : "text-gray-300"
                                  }`}
                                />
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="comment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Comment (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Share your feedback about this teacher..."
                          rows={4}
                          data-testid="input-comment"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={ratingMutation.isPending}
                  data-testid="button-submit"
                >
                  {ratingMutation.isPending ? "Submitting..." : "Submit Rating"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
