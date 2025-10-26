import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Plus, Edit, Trash2, Image, FileText, Users, Bell, Loader2, GraduationCap, UserCog } from "lucide-react";
import type { Event, Notice, GalleryImage, Admission, Faculty, Student, Department } from "@shared/schema";

const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  eventDate: z.string().min(1, "Event date is required"),
  location: z.string().min(1, "Location is required"),
  category: z.string().min(1, "Category is required"),
  isActive: z.boolean().default(true),
});

const noticeSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  category: z.string().min(1, "Category is required"),
  priority: z.enum(["low", "normal", "high", "urgent"]).default("normal"),
  isActive: z.boolean().default(true),
});

const galleryImageSchema = z.object({
  imageUrl: z.string().url("Must be a valid URL").min(1, "Image URL is required"),
  caption: z.string().optional(),
  order: z.number().default(0),
  isActive: z.boolean().default(true),
});

const teacherSchema = z.object({
  designation: z.string().min(1, "Designation is required"),
  departmentId: z.string().optional().nullable(),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
});

const studentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  stream: z.string().min(1, "Stream is required"),
  year: z.number().min(1).max(2),
  section: z.string().min(1, "Section is required"),
  status: z.string().min(1, "Status is required"),
});

type EventForm = z.infer<typeof eventSchema>;
type NoticeForm = z.infer<typeof noticeSchema>;
type GalleryImageForm = z.infer<typeof galleryImageSchema>;
type TeacherForm = z.infer<typeof teacherSchema>;
type StudentForm = z.infer<typeof studentSchema>;

export default function Management() {
  const { user, isLoading: authLoading } = useAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
  const [editingTeacher, setEditingTeacher] = useState<Faculty | null>(null);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteType, setDeleteType] = useState<"event" | "notice" | "gallery" | "admission" | "teacher" | "student" | null>(null);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Redirect non-management users
  if (!user || user.role !== "management") {
    navigate("/");
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Management Dashboard - Ramanujan Junior College</title>
        <meta name="description" content="Manage college events, notices, gallery, and admissions" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" data-testid="title-management">
            Management Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage events, notices, gallery images, and admissions
          </p>
        </div>

        <Tabs defaultValue="teachers" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="teachers" className="gap-2" data-testid="tab-teachers">
              <UserCog className="h-4 w-4" />
              Teachers
            </TabsTrigger>
            <TabsTrigger value="students" className="gap-2" data-testid="tab-students">
              <GraduationCap className="h-4 w-4" />
              Students
            </TabsTrigger>
            <TabsTrigger value="events" className="gap-2" data-testid="tab-events">
              <Calendar className="h-4 w-4" />
              Events
            </TabsTrigger>
            <TabsTrigger value="notices" className="gap-2" data-testid="tab-notices">
              <Bell className="h-4 w-4" />
              Notices
            </TabsTrigger>
            <TabsTrigger value="gallery" className="gap-2" data-testid="tab-gallery">
              <Image className="h-4 w-4" />
              Gallery
            </TabsTrigger>
            <TabsTrigger value="admissions" className="gap-2" data-testid="tab-admissions">
              <Users className="h-4 w-4" />
              Admissions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="teachers">
            <TeachersManagement
              editingTeacher={editingTeacher}
              setEditingTeacher={setEditingTeacher}
              onDelete={(id) => {
                setDeleteId(id);
                setDeleteType("teacher");
              }}
            />
          </TabsContent>

          <TabsContent value="students">
            <StudentsManagement
              editingStudent={editingStudent}
              setEditingStudent={setEditingStudent}
              onDelete={(id) => {
                setDeleteId(id);
                setDeleteType("student");
              }}
            />
          </TabsContent>

          <TabsContent value="events">
            <EventsManagement
              editingEvent={editingEvent}
              setEditingEvent={setEditingEvent}
              onDelete={(id) => {
                setDeleteId(id);
                setDeleteType("event");
              }}
            />
          </TabsContent>

          <TabsContent value="notices">
            <NoticesManagement
              editingNotice={editingNotice}
              setEditingNotice={setEditingNotice}
              onDelete={(id) => {
                setDeleteId(id);
                setDeleteType("notice");
              }}
            />
          </TabsContent>

          <TabsContent value="gallery">
            <GalleryManagement
              onDelete={(id) => {
                setDeleteId(id);
                setDeleteType("gallery");
              }}
            />
          </TabsContent>

          <TabsContent value="admissions">
            <AdmissionsManagement
              onDelete={(id) => {
                setDeleteId(id);
                setDeleteType("admission");
              }}
            />
          </TabsContent>
        </Tabs>

        <DeleteConfirmDialog
          open={!!deleteId}
          onOpenChange={(open) => {
            if (!open) {
              setDeleteId(null);
              setDeleteType(null);
            }
          }}
          onConfirm={() => {
            if (deleteId && deleteType) {
              handleDelete(deleteId, deleteType);
            }
          }}
          type={deleteType || "event"}
        />
      </div>
    </>
  );

  function handleDelete(id: string, type: "event" | "notice" | "gallery" | "admission" | "teacher" | "student") {
    const endpoints = {
      event: `/api/events/${id}`,
      notice: `/api/notices/${id}`,
      gallery: `/api/gallery/${id}`,
      admission: `/api/admissions/${id}`,
      teacher: `/api/faculty/${id}`,
      student: `/api/students/${id}`,
    };

    const queryKeys = {
      event: ["/api/events"],
      notice: ["/api/notices"],
      gallery: ["/api/gallery"],
      admission: ["/api/admissions"],
      teacher: ["/api/faculty"],
      student: ["/api/students"],
    };

    apiRequest("DELETE", endpoints[type])
      .then(() => {
        toast({
          title: "Success",
          description: `${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully`,
        });
        queryClient.invalidateQueries({ queryKey: queryKeys[type] });
        setDeleteId(null);
        setDeleteType(null);
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: error.message || "Failed to delete",
          variant: "destructive",
        });
      });
  }
}

function EventsManagement({
  editingEvent,
  setEditingEvent,
  onDelete,
}: {
  editingEvent: Event | null;
  setEditingEvent: (event: Event | null) => void;
  onDelete: (id: string) => void;
}) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: events = [], isLoading } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

  const form = useForm<EventForm>({
    resolver: zodResolver(eventSchema),
    defaultValues: editingEvent
      ? {
          title: editingEvent.title,
          description: editingEvent.description,
          eventDate: new Date(editingEvent.eventDate).toISOString().slice(0, 16),
          location: editingEvent.location,
          category: editingEvent.category,
          isActive: editingEvent.isActive ?? true,
        }
      : {
          title: "",
          description: "",
          eventDate: "",
          location: "",
          category: "",
          isActive: true,
        },
  });

  const createMutation = useMutation({
    mutationFn: async (data: EventForm) => {
      const payload = {
        ...data,
        eventDate: new Date(data.eventDate).toISOString(),
      };
      const res = await apiRequest("POST", "/api/events", payload);
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Event created successfully" });
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      form.reset();
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: EventForm) => {
      const payload = {
        ...data,
        eventDate: new Date(data.eventDate).toISOString(),
      };
      const res = await apiRequest("PATCH", `/api/events/${editingEvent?.id}`, payload);
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Event updated successfully" });
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      setEditingEvent(null);
      form.reset();
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const onSubmit = (data: EventForm) => {
    if (editingEvent) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            {editingEvent ? "Edit Event" : "Add New Event"}
          </CardTitle>
          <CardDescription>
            {editingEvent ? "Update event details" : "Create a new event for the college"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Title *</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Annual Sports Day" data-testid="input-event-title" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-event-category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Academic">Academic</SelectItem>
                          <SelectItem value="Sports">Sports</SelectItem>
                          <SelectItem value="Cultural">Cultural</SelectItem>
                          <SelectItem value="Social">Social</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description *</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Event description..."
                        rows={3}
                        data-testid="textarea-event-description"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="eventDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Date & Time *</FormLabel>
                      <FormControl>
                        <Input type="datetime-local" {...field} data-testid="input-event-date" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location *</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="College Auditorium" data-testid="input-event-location" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-3">
                <Button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  data-testid="button-save-event"
                >
                  {createMutation.isPending || updateMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {editingEvent ? "Updating..." : "Creating..."}
                    </>
                  ) : (
                    <>{editingEvent ? "Update Event" : "Create Event"}</>
                  )}
                </Button>
                {editingEvent && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setEditingEvent(null);
                      form.reset();
                    }}
                    data-testid="button-cancel-event"
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Events</CardTitle>
          <CardDescription>Manage existing events</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : events.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No events found</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {events.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium">{event.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{event.category}</Badge>
                      </TableCell>
                      <TableCell>{new Date(event.eventDate).toLocaleDateString()}</TableCell>
                      <TableCell>{event.location}</TableCell>
                      <TableCell>
                        <Badge variant={event.isActive ? "default" : "secondary"}>
                          {event.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingEvent(event);
                              form.reset({
                                title: event.title,
                                description: event.description,
                                eventDate: new Date(event.eventDate).toISOString().slice(0, 16),
                                location: event.location,
                                category: event.category,
                                isActive: event.isActive ?? true,
                              });
                            }}
                            data-testid={`button-edit-event-${event.id}`}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => onDelete(event.id)}
                            data-testid={`button-delete-event-${event.id}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function NoticesManagement({
  editingNotice,
  setEditingNotice,
  onDelete,
}: {
  editingNotice: Notice | null;
  setEditingNotice: (notice: Notice | null) => void;
  onDelete: (id: string) => void;
}) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: notices = [], isLoading } = useQuery<Notice[]>({
    queryKey: ["/api/notices"],
  });

  const form = useForm<NoticeForm>({
    resolver: zodResolver(noticeSchema),
    defaultValues: editingNotice
      ? {
          title: editingNotice.title,
          content: editingNotice.content,
          category: editingNotice.category,
          priority: (editingNotice.priority as "low" | "normal" | "high" | "urgent") || "normal",
          isActive: editingNotice.isActive ?? true,
        }
      : {
          title: "",
          content: "",
          category: "",
          priority: "normal",
          isActive: true,
        },
  });

  const createMutation = useMutation({
    mutationFn: async (data: NoticeForm) => {
      const res = await apiRequest("POST", "/api/notices", data);
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Notice created successfully" });
      queryClient.invalidateQueries({ queryKey: ["/api/notices"] });
      form.reset();
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: NoticeForm) => {
      const res = await apiRequest("PATCH", `/api/notices/${editingNotice?.id}`, data);
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Notice updated successfully" });
      queryClient.invalidateQueries({ queryKey: ["/api/notices"] });
      setEditingNotice(null);
      form.reset();
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const onSubmit = (data: NoticeForm) => {
    if (editingNotice) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            {editingNotice ? "Edit Notice" : "Add New Notice"}
          </CardTitle>
          <CardDescription>
            {editingNotice ? "Update notice details" : "Create a new notice for the college"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notice Title *</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Important Announcement" data-testid="input-notice-title" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-notice-category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Academic">Academic</SelectItem>
                          <SelectItem value="Examination">Examination</SelectItem>
                          <SelectItem value="Administrative">Administrative</SelectItem>
                          <SelectItem value="Holiday">Holiday</SelectItem>
                          <SelectItem value="General">General</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content *</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Notice content..."
                        rows={4}
                        data-testid="textarea-notice-content"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-notice-priority">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-3">
                <Button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  data-testid="button-save-notice"
                >
                  {createMutation.isPending || updateMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {editingNotice ? "Updating..." : "Creating..."}
                    </>
                  ) : (
                    <>{editingNotice ? "Update Notice" : "Create Notice"}</>
                  )}
                </Button>
                {editingNotice && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setEditingNotice(null);
                      form.reset();
                    }}
                    data-testid="button-cancel-notice"
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Notices</CardTitle>
          <CardDescription>Manage existing notices</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : notices.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No notices found</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Published</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {notices.map((notice) => (
                    <TableRow key={notice.id}>
                      <TableCell className="font-medium">{notice.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{notice.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            notice.priority === "urgent"
                              ? "destructive"
                              : notice.priority === "high"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {notice.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {notice.publishedAt ? new Date(notice.publishedAt).toLocaleDateString() : "N/A"}
                      </TableCell>
                      <TableCell>
                        <Badge variant={notice.isActive ? "default" : "secondary"}>
                          {notice.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingNotice(notice);
                              form.reset({
                                title: notice.title,
                                content: notice.content,
                                category: notice.category,
                                priority: (notice.priority as "low" | "normal" | "high" | "urgent") || "normal",
                                isActive: notice.isActive ?? true,
                              });
                            }}
                            data-testid={`button-edit-notice-${notice.id}`}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => onDelete(notice.id)}
                            data-testid={`button-delete-notice-${notice.id}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function GalleryManagement({ onDelete }: { onDelete: (id: string) => void }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: images = [], isLoading } = useQuery<GalleryImage[]>({
    queryKey: ["/api/gallery"],
  });

  const form = useForm<GalleryImageForm>({
    resolver: zodResolver(galleryImageSchema),
    defaultValues: {
      imageUrl: "",
      caption: "",
      order: 0,
      isActive: true,
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: GalleryImageForm) => {
      const res = await apiRequest("POST", "/api/gallery", data);
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Image added to gallery successfully" });
      queryClient.invalidateQueries({ queryKey: ["/api/gallery"] });
      form.reset();
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const onSubmit = (data: GalleryImageForm) => {
    createMutation.mutate(data);
  };

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add New Image
          </CardTitle>
          <CardDescription>Add a new photo to the college gallery</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        data-testid="input-gallery-url"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="caption"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Caption (Optional)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Image caption" data-testid="input-gallery-caption" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="order"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Display Order</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        data-testid="input-gallery-order"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={createMutation.isPending} data-testid="button-add-gallery">
                {createMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  "Add Image"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gallery Images</CardTitle>
          <CardDescription>Manage gallery photos</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : images.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No images found</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {images.map((image) => (
                <Card key={image.id} className="overflow-hidden">
                  <div className="aspect-video relative bg-muted">
                    <img
                      src={image.imageUrl}
                      alt={image.caption || "Gallery image"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    {image.caption && <p className="text-sm mb-3">{image.caption}</p>}
                    <div className="flex gap-2 items-center justify-between">
                      <Badge variant="outline">Order: {image.order}</Badge>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => onDelete(image.id)}
                        data-testid={`button-delete-gallery-${image.id}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function AdmissionsManagement({ onDelete }: { onDelete: (id: string) => void }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: admissions = [], isLoading } = useQuery<Admission[]>({
    queryKey: ["/api/admissions"],
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const res = await apiRequest("PATCH", `/api/admissions/${id}/status`, { status });
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Admission status updated successfully" });
      queryClient.invalidateQueries({ queryKey: ["/api/admissions"] });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Admission Applications</CardTitle>
        <CardDescription>Review and manage admission applications</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : admissions.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No admissions found</p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Stream</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {admissions.map((admission) => (
                  <TableRow key={admission.id}>
                    <TableCell className="font-medium">{admission.fullName}</TableCell>
                    <TableCell>{admission.email}</TableCell>
                    <TableCell>{admission.phone}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{admission.stream}</Badge>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={admission.status}
                        onValueChange={(value) =>
                          updateStatusMutation.mutate({ id: admission.id, status: value })
                        }
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="approved">Approved</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      {admission.submittedAt ? new Date(admission.submittedAt).toLocaleDateString() : "N/A"}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => onDelete(admission.id)}
                        data-testid={`button-delete-admission-${admission.id}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function DeleteConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  type,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  type: "event" | "notice" | "gallery" | "admission" | "teacher" | "student";
}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this {type}. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel data-testid="button-cancel-delete">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90" data-testid="button-confirm-delete">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function TeachersManagement({
  editingTeacher,
  setEditingTeacher,
  onDelete,
}: {
  editingTeacher: Faculty | null;
  setEditingTeacher: (teacher: Faculty | null) => void;
  onDelete: (id: string) => void;
}) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: teachers = [], isLoading } = useQuery<Faculty[]>({
    queryKey: ["/api/faculty"],
  });

  const { data: departments = [] } = useQuery<Department[]>({
    queryKey: ["/api/departments"],
  });

  const form = useForm<TeacherForm>({
    resolver: zodResolver(teacherSchema),
    defaultValues: editingTeacher
      ? {
          designation: editingTeacher.designation,
          departmentId: editingTeacher.departmentId || "",
          email: editingTeacher.email || "",
          phone: editingTeacher.phone || "",
        }
      : {
          designation: "",
          departmentId: "",
          email: "",
          phone: "",
        },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: TeacherForm) => {
      const res = await apiRequest("PATCH", `/api/faculty/${editingTeacher?.id}`, data);
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Teacher updated successfully" });
      queryClient.invalidateQueries({ queryKey: ["/api/faculty"] });
      setEditingTeacher(null);
      form.reset();
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const onSubmit = (data: TeacherForm) => {
    if (editingTeacher) {
      updateMutation.mutate(data);
    }
  };

  return (
    <div className="grid gap-6">
      {editingTeacher && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5" />
              Edit Teacher
            </CardTitle>
            <CardDescription>Update teacher details</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="designation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Designation *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Associate Professor" data-testid="input-teacher-designation" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="departmentId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Department</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value || ""}>
                          <FormControl>
                            <SelectTrigger data-testid="select-teacher-department">
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="">None</SelectItem>
                            {departments.map((dept) => (
                              <SelectItem key={dept.id} value={dept.id}>
                                {dept.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" placeholder="teacher@example.com" data-testid="input-teacher-email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="1234567890" data-testid="input-teacher-phone" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    type="submit"
                    disabled={updateMutation.isPending}
                    data-testid="button-save-teacher"
                  >
                    {updateMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      "Update Teacher"
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setEditingTeacher(null);
                      form.reset();
                    }}
                    data-testid="button-cancel-teacher"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>All Teachers</CardTitle>
          <CardDescription>Manage existing teachers</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : teachers.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No teachers found</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Designation</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teachers.map((teacher) => (
                    <TableRow key={teacher.id}>
                      <TableCell className="font-medium">{teacher.name}</TableCell>
                      <TableCell>{teacher.designation}</TableCell>
                      <TableCell>
                        {departments.find((d) => d.id === teacher.departmentId)?.name || "N/A"}
                      </TableCell>
                      <TableCell>{teacher.email || "N/A"}</TableCell>
                      <TableCell>{teacher.phone || "N/A"}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingTeacher(teacher);
                              form.reset({
                                designation: teacher.designation,
                                departmentId: teacher.departmentId || "",
                                email: teacher.email || "",
                                phone: teacher.phone || "",
                              });
                            }}
                            data-testid={`button-edit-teacher-${teacher.id}`}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => onDelete(teacher.id)}
                            data-testid={`button-delete-teacher-${teacher.id}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function StudentsManagement({
  editingStudent,
  setEditingStudent,
  onDelete,
}: {
  editingStudent: Student | null;
  setEditingStudent: (student: Student | null) => void;
  onDelete: (id: string) => void;
}) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: students = [], isLoading } = useQuery<Student[]>({
    queryKey: ["/api/students"],
  });

  const form = useForm<StudentForm>({
    resolver: zodResolver(studentSchema),
    defaultValues: editingStudent
      ? {
          name: editingStudent.name,
          stream: editingStudent.stream,
          year: editingStudent.year,
          section: editingStudent.section,
          status: editingStudent.status,
        }
      : {
          name: "",
          stream: "",
          year: 1,
          section: "",
          status: "",
        },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: StudentForm) => {
      const res = await apiRequest("PATCH", `/api/students/${editingStudent?.id}`, data);
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Student updated successfully" });
      queryClient.invalidateQueries({ queryKey: ["/api/students"] });
      setEditingStudent(null);
      form.reset();
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const onSubmit = (data: StudentForm) => {
    if (editingStudent) {
      updateMutation.mutate(data);
    }
  };

  return (
    <div className="grid gap-6">
      {editingStudent && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5" />
              Edit Student
            </CardTitle>
            <CardDescription>Update student details</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name *</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Student Name" data-testid="input-student-name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="stream"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stream *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-student-stream">
                              <SelectValue placeholder="Select stream" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Science">Science</SelectItem>
                            <SelectItem value="Arts">Arts</SelectItem>
                            <SelectItem value="Commerce">Commerce</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year *</FormLabel>
                        <Select onValueChange={(value) => field.onChange(Number(value))} value={field.value.toString()}>
                          <FormControl>
                            <SelectTrigger data-testid="select-student-year">
                              <SelectValue placeholder="Select year" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">1st Year</SelectItem>
                            <SelectItem value="2">2nd Year</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="section"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Section *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="A" data-testid="input-student-section" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-student-status">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="current">Current</SelectItem>
                            <SelectItem value="graduated">Graduated</SelectItem>
                            <SelectItem value="suspended">Suspended</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    type="submit"
                    disabled={updateMutation.isPending}
                    data-testid="button-save-student"
                  >
                    {updateMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      "Update Student"
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setEditingStudent(null);
                      form.reset();
                    }}
                    data-testid="button-cancel-student"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>All Students</CardTitle>
          <CardDescription>Manage existing students</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : students.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No students found</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Stream</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead>Section</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.studentId}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{student.stream}</Badge>
                      </TableCell>
                      <TableCell>{student.year}</TableCell>
                      <TableCell>{student.section}</TableCell>
                      <TableCell>
                        <Badge variant={student.status === "current" ? "default" : "secondary"}>
                          {student.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingStudent(student);
                              form.reset({
                                name: student.name,
                                stream: student.stream,
                                year: student.year,
                                section: student.section,
                                status: student.status,
                              });
                            }}
                            data-testid={`button-edit-student-${student.id}`}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => onDelete(student.id)}
                            data-testid={`button-delete-student-${student.id}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
