import { useState } from "react";
// import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  User,
  MessageSquare,
  Building,
  GraduationCap,
  Users,
  Briefcase,
  BookOpen,
  HelpCircle,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  CheckCircle
} from "lucide-react";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.preprocess((val) => val === "" ? undefined : val, z.string().min(10, "Please enter a valid phone number").optional()),
  subject: z.string().min(1, "Please select a subject"),
  department: z.string().min(1, "Please select a department"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      department: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      // In a real application, this would send the data to an API endpoint
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      toast({
        title: "Message Sent Successfully",
        description: "Thank you for your inquiry. We'll get back to you within 24 hours.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Error Sending Message",
        description: "Please try again later or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      content: "Kalkaji, New Delhi - 110019",
      color: "primary"
    },
    {
      icon: Phone,
      title: "Phone",
      content: "+91-11-26430047",
      color: "accent"
    },
    {
      icon: Mail,
      title: "Email",
      content: "info@ramanujancollege.ac.in",
      color: "secondary"
    },
    {
      icon: Clock,
      title: "Office Hours",
      content: "Mon-Fri: 9:00 AM - 5:00 PM",
      color: "primary"
    }
  ];

  const departmentContacts = [
    {
      title: "Admissions Office",
      email: "admissions@ramanujancollege.ac.in",
      phone: "+91-11-26430047",
      icon: GraduationCap,
      description: "For admission queries and application assistance"
    },
    {
      title: "Academic Office",
      email: "academics@ramanujancollege.ac.in",
      phone: "+91-11-26430048",
      icon: BookOpen,
      description: "For academic matters, timetables, and course information"
    },
    {
      title: "Student Affairs",
      email: "students@ramanujancollege.ac.in",
      phone: "+91-11-26430049",
      icon: Users,
      description: "For student services, societies, and welfare matters"
    },
    {
      title: "Placement Cell",
      email: "placement@ramanujancollege.ac.in",
      phone: "+91-11-26430050",
      icon: Briefcase,
      description: "For career guidance and placement opportunities"
    },
    {
      title: "Principal's Office",
      email: "principal@ramanujancollege.ac.in",
      phone: "+91-11-26430051",
      icon: Building,
      description: "For administrative matters and official correspondence"
    },
    {
      title: "General Inquiries",
      email: "info@ramanujancollege.ac.in",
      phone: "+91-11-26430047",
      icon: HelpCircle,
      description: "For general questions and information"
    }
  ];

  return (
    <>
      {/* <Helmet>
        <title>Contact Us - Ramanujan College | Get in Touch - University of Delhi</title>
        <meta name="description" content="Contact Ramanujan College for admissions, academic queries, and general information. Find our address, phone numbers, email contacts, and office hours in New Delhi." />
      </Helmet> */}

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif" data-testid="page-title">
                Contact Us
              </h1>
              <p className="text-xl opacity-90" data-testid="page-subtitle">
                Get in Touch with Ramanujan College
              </p>
              <p className="text-lg opacity-80 mt-4">
                We're here to help with your queries and provide assistance
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 font-serif" data-testid="contact-info-title">
                Contact Information
              </h2>
              <p className="text-lg text-muted-foreground">
                Multiple ways to reach us for different needs
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {contactInfo.map((info, index) => (
                <Card key={info.title} className="p-6 text-center hover:shadow-lg transition-shadow" data-testid={`contact-info-${index}`}>
                  <div className={`w-16 h-16 bg-${info.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <info.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">{info.title}</h3>
                  <p className="text-muted-foreground">{info.content}</p>
                </Card>
              ))}
            </div>

            {/* Campus Location */}
            <Card className="p-8 mb-16">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="flex items-center text-2xl">
                  <MapPin className="w-6 h-6 mr-2 text-primary" />
                  Campus Location
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h4 className="text-lg font-semibold mb-4">How to Reach Us</h4>
                    <div className="space-y-3 text-muted-foreground">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 mr-3 mt-0.5 text-primary flex-shrink-0" />
                        <span className="text-sm">
                          <strong>By Metro:</strong> Nearest metro station is Kalkaji Mandir (Violet Line). 
                          The college is a 5-minute walk from the metro station.
                        </span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 mr-3 mt-0.5 text-primary flex-shrink-0" />
                        <span className="text-sm">
                          <strong>By Bus:</strong> Multiple DTC buses ply to Kalkaji. 
                          Alight at Kalkaji bus stop and walk 2 minutes to the college.
                        </span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 mr-3 mt-0.5 text-primary flex-shrink-0" />
                        <span className="text-sm">
                          <strong>By Car:</strong> Ample parking space available on campus. 
                          The college is well-connected by road from all parts of Delhi.
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-muted rounded-lg p-4 text-center">
                    <MapPin className="w-16 h-16 mx-auto text-primary mb-4" />
                    <p className="font-semibold mb-2">Ramanujan College</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      University of Delhi<br />
                      Kalkaji, New Delhi - 110019
                    </p>
                    <a 
                      href="https://maps.google.com/?q=Ramanujan+College,+Kalkaji,+New+Delhi,+110019" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" data-testid="view-map">
                        View on Google Maps
                      </Button>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Department Contacts */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 font-serif" data-testid="department-contacts-title">
                Department Contacts
              </h2>
              <p className="text-lg text-muted-foreground">
                Direct contact information for specific departments and services
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departmentContacts.map((dept, index) => (
                <Card key={dept.title} className="p-6 hover:shadow-lg transition-shadow" data-testid={`department-contact-${index}`}>
                  <CardHeader className="p-0 pb-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4">
                        <dept.icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <CardTitle className="text-lg">{dept.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-sm text-muted-foreground mb-4">{dept.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Mail className="w-4 h-4 mr-2 text-primary" />
                        <a href={`mailto:${dept.email}`} className="text-primary hover:underline">
                          {dept.email}
                        </a>
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="w-4 h-4 mr-2 text-primary" />
                        <a href={`tel:${dept.phone}`} className="text-primary hover:underline">
                          {dept.phone}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 font-serif" data-testid="contact-form-title">
                  Send us a Message
                </h2>
                <p className="text-lg text-muted-foreground">
                  Have a question or need assistance? Fill out the form below and we'll get back to you
                </p>
              </div>

              <Card className="p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="contact-form">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your full name" {...field} data-testid="input-name" />
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
                            <FormLabel>Email Address *</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="Enter your email address" {...field} data-testid="input-email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your phone number" {...field} data-testid="input-phone" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject *</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value || undefined}>
                              <FormControl>
                                <SelectTrigger data-testid="select-subject">
                                  <SelectValue placeholder="Select a subject" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="admission">Admission Inquiry</SelectItem>
                                <SelectItem value="academic">Academic Information</SelectItem>
                                <SelectItem value="placement">Placement & Career</SelectItem>
                                <SelectItem value="facilities">Facilities & Infrastructure</SelectItem>
                                <SelectItem value="research">Research Opportunities</SelectItem>
                                <SelectItem value="general">General Inquiry</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="department"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Department *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value || undefined}>
                            <FormControl>
                              <SelectTrigger data-testid="select-department">
                                <SelectValue placeholder="Select relevant department" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="admissions">Admissions Office</SelectItem>
                              <SelectItem value="academics">Academic Office</SelectItem>
                              <SelectItem value="students">Student Affairs</SelectItem>
                              <SelectItem value="placement">Placement Cell</SelectItem>
                              <SelectItem value="principal">Principal's Office</SelectItem>
                              <SelectItem value="library">Library</SelectItem>
                              <SelectItem value="accounts">Accounts Department</SelectItem>
                              <SelectItem value="general">General Office</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Please provide details about your inquiry..."
                              className="min-h-[120px] resize-none"
                              {...field}
                              data-testid="textarea-message"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="text-center">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-8 py-3"
                        data-testid="submit-contact-form"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </Card>
            </div>
          </div>
        </section>

        {/* Social Media & Additional Info */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Social Media */}
              <Card className="p-8">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="text-2xl">Follow Us</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-muted-foreground mb-6">
                    Stay connected with us through social media for the latest updates, events, and announcements.
                  </p>
                  <div className="flex space-x-4">
                    <a 
                      href="#" 
                      className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-primary-foreground hover:bg-primary/80 transition-colors"
                      data-testid="social-facebook"
                      aria-label="Facebook"
                    >
                      <Facebook className="w-6 h-6" />
                    </a>
                    <a 
                      href="#" 
                      className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-primary-foreground hover:bg-primary/80 transition-colors"
                      data-testid="social-twitter"
                      aria-label="Twitter"
                    >
                      <Twitter className="w-6 h-6" />
                    </a>
                    <a 
                      href="#" 
                      className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-primary-foreground hover:bg-primary/80 transition-colors"
                      data-testid="social-instagram"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-6 h-6" />
                    </a>
                    <a 
                      href="#" 
                      className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-primary-foreground hover:bg-primary/80 transition-colors"
                      data-testid="social-youtube"
                      aria-label="YouTube"
                    >
                      <Youtube className="w-6 h-6" />
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Visit Guidelines */}
              <Card className="p-8">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="text-2xl">Visit Us</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-muted-foreground mb-4">
                    Planning to visit our campus? Here are some helpful guidelines:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-3 mt-0.5 text-primary flex-shrink-0" />
                      <span className="text-sm">Visitor registration at the main gate is mandatory</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-3 mt-0.5 text-primary flex-shrink-0" />
                      <span className="text-sm">Carry a valid photo ID for verification</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-3 mt-0.5 text-primary flex-shrink-0" />
                      <span className="text-sm">Campus tours available during working hours</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-3 mt-0.5 text-primary flex-shrink-0" />
                      <span className="text-sm">Prior appointment recommended for meetings</span>
                    </li>
                  </ul>
                  <Button variant="outline" className="mt-6" data-testid="schedule-visit">
                    Schedule a Visit
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
