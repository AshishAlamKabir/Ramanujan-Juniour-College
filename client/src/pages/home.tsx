import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Megaphone, Calendar, Link as LinkIcon, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import type { Notice, Event } from "@shared/schema";
import principalImage from "@assets/image_1760023930701.png";

import image1 from "@assets/Screenshot 2025-10-02 162408_1759402604596.png";
import image2 from "@assets/Screenshot 2025-10-02 162348_1759402604596.png";
import image3 from "@assets/Screenshot 2025-10-02 162333_1759402604597.png";
import image4 from "@assets/Screenshot 2025-10-02 162306_1759402604597.png";
import image5 from "@assets/Screenshot 2025-10-02 162244_1759402604598.png";
import image6 from "@assets/Screenshot 2025-10-02 162227_1759402604599.png";
import image7 from "@assets/Screenshot 2025-10-02 162213_1759402604599.png";
import image8 from "@assets/Screenshot 2025-10-02 162156_1759402604600.png";

const collegeImages = [
  { src: image1, caption: "Student Success" },
  { src: image2, caption: "Student Celebrations" },
  { src: image3, caption: "Award Ceremony" },
  { src: image4, caption: "Student Success" },
  { src: image5, caption: "College Event" },
  { src: image6, caption: "Academic Event" },
  { src: image7, caption: "Cultural Program" },
  { src: image8, caption: "Student Achievement" },
];

export default function Home() {
  const [showFullMessage, setShowFullMessage] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: notices } = useQuery<Notice[]>({
    queryKey: ["/api/notices"],
  });

  const { data: events } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % collegeImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + collegeImages.length) % collegeImages.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % collegeImages.length);
  };

  const formatDate = (date: Date | string) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  const fullMessage = `This prospectus is intended to give all the necessary information about our system of imparting excellent education to the sincere and devoted students wishing for a successful career and shine in today's competitive world...`;

  const previewMessage = `This prospectus is intended to give all the necessary information about our system of imparting excellent education to the sincere and devoted students wishing for a successful career and shine in today's competitive world...`;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Blue Background */}
      <section className="hero-bg text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative">
          {/* Hero Content */}
          <div className="container mx-auto px-4 py-12 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-2 font-serif" data-testid="college-name">
              Ramanujan Junior College
            </h2>
            <p className="text-lg md:text-xl opacity-90 mb-1" data-testid="vision-statement">
              Education, Development and Progress
            </p>
            <p className="text-sm md:text-base opacity-80" data-testid="establishment-year">
              Established in 2004
            </p>
          </div>
        </div>
      </section>

      {/* Two Column Layout: Principal's Desk + Achievements */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left: From Principal's Desk */}
            <Card className="overflow-hidden shadow-lg">
              <CardHeader className="bg-primary text-primary-foreground pb-4">
                <CardTitle className="text-xl font-serif text-center">
                  From Principal's Desk
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex flex-col items-center gap-4">
                  {/* Principal's Image */}
                  <img 
                    src={principalImage} 
                    alt="Principal Mr. Dilip Kumar Borah" 
                    className="w-32 h-32 rounded-lg object-cover border-4 border-primary/20 shadow-lg" 
                    data-testid="img-principal"
                  />
                  
                  {/* Principal's Message */}
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-4 text-justify" data-testid="text-principal-message">
                      {showFullMessage ? fullMessage : previewMessage}
                    </p>
                    
                    <Button 
                      onClick={() => setShowFullMessage(!showFullMessage)}
                      variant="default"
                      size="sm"
                      className="mb-4"
                      data-testid="button-show-more"
                    >
                      {showFullMessage ? "Show Less" : "SHOW MORE"}
                    </Button>
                    
                    <div className="font-semibold text-sm" data-testid="text-principal-signature">
                      <p className="text-base font-bold">Principal</p>
                      <p className="text-sm">(Mr. Dilip Kumar Borah)</p>
                      <p className="text-xs text-muted-foreground">Ramanujan Junior College</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Right: College Achievements & Events Carousel */}
            <Card className="overflow-hidden shadow-lg">
              <CardHeader className="bg-primary text-primary-foreground pb-4">
                <CardTitle className="text-xl font-serif text-center">
                  College Achievements & Events
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative aspect-video w-full bg-muted">
                  <img
                    src={collegeImages[currentIndex].src}
                    alt={collegeImages[currentIndex].caption}
                    className="w-full h-full object-cover"
                    data-testid={`img-event-${currentIndex}`}
                  />

                  {collegeImages[currentIndex].caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-4">
                      <p className="text-center text-sm font-medium" data-testid="text-event-caption">
                        {collegeImages[currentIndex].caption}
                      </p>
                    </div>
                  )}

                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
                    onClick={goToPrevious}
                    data-testid="button-event-prev"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>

                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
                    onClick={goToNext}
                    data-testid="button-event-next"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </div>

                <div className="flex justify-center gap-2 p-3 flex-wrap">
                  {collegeImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentIndex 
                          ? "bg-primary scale-110" 
                          : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                      }`}
                      data-testid={`button-event-dot-${index}`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Three Column Cards: Notice Board, Events, Quick Links */}
      <section className="py-8 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Notice Board */}
            <Card className="shadow-lg overflow-hidden">
              <CardHeader className="bg-primary text-primary-foreground">
                <CardTitle className="flex items-center">
                  <Megaphone className="w-5 h-5 mr-2" />
                  Notice Board
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-72 overflow-y-auto" data-testid="notices-list">
                  {!notices || notices.length === 0 ? (
                    <div className="p-5 text-center text-muted-foreground text-sm">
                      No notices available at this time.
                    </div>
                  ) : (
                    <div className="p-5 space-y-3">
                      {notices.slice(0, 5).map((notice, index) => (
                        <div key={notice.id} className={`border-l-4 pl-4 py-2 ${
                          notice.priority === 'high' ? 'border-destructive' :
                          notice.priority === 'medium' ? 'border-accent' : 'border-primary'
                        }`} data-testid={`notice-${index}`}>
                          <h4 className="font-semibold text-sm">{notice.title}</h4>
                          <p className="text-xs text-muted-foreground">
                            {notice.publishedAt && formatDate(notice.publishedAt)}
                          </p>
                          {notice.category && (
                            <Badge variant="outline" className="mt-1 text-xs">
                              {notice.category}
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="px-5 py-3 bg-muted">
                  <Link href="/students#notices" className="text-primary font-semibold text-xs hover:underline" data-testid="view-all-notices">
                    View All Notices →
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Ongoing Events */}
            <Card className="shadow-lg overflow-hidden">
              <CardHeader className="bg-yellow-500 text-yellow-950">
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Ongoing Events
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-72 overflow-y-auto" data-testid="events-list">
                  {!events || events.length === 0 ? (
                    <div className="p-5 text-center text-muted-foreground text-sm">
                      No upcoming events at this time.
                    </div>
                  ) : (
                    <div className="p-5 space-y-3">
                      {events.slice(0, 3).map((event, index) => (
                        <div key={event.id} className="flex items-start space-x-3" data-testid={`event-${index}`}>
                          <div className="bg-primary text-primary-foreground rounded p-2 text-xs font-bold text-center min-w-[50px]">
                            <div>{new Date(event.eventDate).toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}</div>
                            <div>{new Date(event.eventDate).getDate()}</div>
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm">{event.title}</h4>
                            <p className="text-xs text-muted-foreground">{event.location}</p>
                            <p className="text-xs text-muted-foreground mt-1">{event.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="px-5 py-3 bg-muted">
                  <Link href="/news#events" className="text-primary font-semibold text-xs hover:underline" data-testid="view-all-events">
                    View All Events →
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="shadow-lg">
              <CardHeader className="bg-secondary text-secondary-foreground">
                <CardTitle className="flex items-center">
                  <LinkIcon className="w-5 h-5 mr-2" />
                  Quick Links
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 space-y-2">
                <Link 
                  href="/students#timetables" 
                  className="flex items-center justify-between p-2.5 rounded hover:bg-muted transition-colors"
                  data-testid="quick-link-timetables"
                >
                  <span className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 mr-2.5 text-primary" />
                    Time Tables
                  </span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                </Link>
                <Link 
                  href="/academics#calendar" 
                  className="flex items-center justify-between p-2.5 rounded hover:bg-muted transition-colors"
                  data-testid="quick-link-calendar"
                >
                  <span className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 mr-2.5 text-primary" />
                    Academic Calendar
                  </span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                </Link>
                <Link 
                  href="/admissions" 
                  className="flex items-center justify-between p-2.5 rounded hover:bg-muted transition-colors"
                  data-testid="quick-link-admissions"
                >
                  <span className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 mr-2.5 text-primary" />
                    Admissions
                  </span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                </Link>
                <Link 
                  href="/students#forms" 
                  className="flex items-center justify-between p-2.5 rounded hover:bg-muted transition-colors"
                  data-testid="quick-link-forms"
                >
                  <span className="flex items-center text-sm">
                    <LinkIcon className="w-4 h-4 mr-2.5 text-primary" />
                    Forms & Documents
                  </span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                </Link>
                <Link 
                  href="/students#placement" 
                  className="flex items-center justify-between p-2.5 rounded hover:bg-muted transition-colors"
                  data-testid="quick-link-placement"
                >
                  <span className="flex items-center text-sm">
                    <LinkIcon className="w-4 h-4 mr-2.5 text-primary" />
                    Placement Cell
                  </span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
