import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Megaphone, Calendar, Link as LinkIcon, ArrowRight } from "lucide-react";
import { Notice, Event } from "@shared/schema";
import { formatDistanceToNow } from "date-fns";
import { Link } from "wouter";

export default function NoticeBoard() {
  const { data: notices, isLoading: noticesLoading } = useQuery<Notice[]>({
    queryKey: ["/api/notices"],
  });

  const { data: events, isLoading: eventsLoading } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

  const formatDate = (date: Date | string) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  if (noticesLoading || eventsLoading) {
    return (
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="shadow-lg">
                <CardHeader>
                  <div className="h-4 bg-muted-foreground/20 rounded animate-pulse"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {[...Array(4)].map((_, j) => (
                      <div key={j} className="h-3 bg-muted-foreground/20 rounded animate-pulse"></div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-muted">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Notice Board */}
          <Card className="shadow-lg overflow-hidden">
            <CardHeader className="bg-primary text-primary-foreground">
              <CardTitle className="flex items-center">
                <Megaphone className="w-5 h-5 mr-2" />
                Notice Board
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-80 overflow-y-auto" data-testid="notices-list">
                {!notices || notices.length === 0 ? (
                  <div className="p-6 text-center text-muted-foreground">
                    No notices available at this time.
                  </div>
                ) : (
                  <div className="p-6 space-y-4">
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
              <div className="px-6 py-4 bg-muted">
                <Link href="/students#notices" className="text-primary font-semibold text-sm hover:underline" data-testid="view-all-notices">
                  View All Notices →
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Ongoing Events */}
          <Card className="shadow-lg overflow-hidden">
            <CardHeader className="bg-accent text-accent-foreground">
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Ongoing Events
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-80 overflow-y-auto" data-testid="events-list">
                {!events || events.length === 0 ? (
                  <div className="p-6 text-center text-muted-foreground">
                    No upcoming events at this time.
                  </div>
                ) : (
                  <div className="p-6 space-y-4">
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
              <div className="px-6 py-4 bg-muted">
                <Link href="/news#events" className="text-primary font-semibold text-sm hover:underline" data-testid="view-all-events">
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
            <CardContent className="p-6 space-y-3">
              <Link 
                href="/students#timetables" 
                className="flex items-center justify-between p-3 rounded hover:bg-muted transition-colors"
                data-testid="quick-link-timetables"
              >
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-3 text-primary" />
                  Time Tables
                </span>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </Link>
              <Link 
                href="/academics#calendar" 
                className="flex items-center justify-between p-3 rounded hover:bg-muted transition-colors"
                data-testid="quick-link-calendar"
              >
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-3 text-primary" />
                  Academic Calendar
                </span>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </Link>
              <Link 
                href="/admissions" 
                className="flex items-center justify-between p-3 rounded hover:bg-muted transition-colors"
                data-testid="quick-link-admissions"
              >
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-3 text-primary" />
                  Admissions
                </span>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </Link>
              <Link 
                href="/students#forms" 
                className="flex items-center justify-between p-3 rounded hover:bg-muted transition-colors"
                data-testid="quick-link-forms"
              >
                <span className="flex items-center">
                  <LinkIcon className="w-4 h-4 mr-3 text-primary" />
                  Forms & Documents
                </span>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </Link>
              <Link 
                href="/students#placement" 
                className="flex items-center justify-between p-3 rounded hover:bg-muted transition-colors"
                data-testid="quick-link-placement"
              >
                <span className="flex items-center">
                  <LinkIcon className="w-4 h-4 mr-3 text-primary" />
                  Placement Cell
                </span>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
