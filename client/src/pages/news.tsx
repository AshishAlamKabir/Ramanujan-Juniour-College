import { useQuery } from "@tanstack/react-query";
// import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Newspaper,
  Calendar,
  Clock,
  User,
  ExternalLink,
  Star,
  TrendingUp,
  Award,
  Users,
  BookOpen,
  Mail,
  ArrowRight
} from "lucide-react";
import { News, Event } from "@shared/schema";
import { formatDistanceToNow, format } from "date-fns";

export default function NewsPage() {
  const { data: news, isLoading: newsLoading } = useQuery<News[]>({
    queryKey: ["/api/news"],
  });

  const { data: featuredNews, isLoading: featuredLoading } = useQuery<News[]>({
    queryKey: ["/api/news/featured"],
  });

  const { data: events, isLoading: eventsLoading } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

  const pressReleases = [
    {
      title: "NAAC A++ Accreditation Renewed",
      description: "College maintains highest grade for excellence in education",
      date: "Dec 18, 2024"
    },
    {
      title: "New Industry Partnerships",
      description: "Strategic collaborations for enhanced placement opportunities",
      date: "Dec 15, 2024"
    },
    {
      title: "Research Grant Awarded",
      description: "₹50 lakhs sanctioned for environmental science project",
      date: "Dec 12, 2024"
    }
  ];

  const upcomingEvents = events?.filter(event => new Date(event.eventDate) >= new Date()).slice(0, 5) || [];
  const recentNews = news?.slice(0, 6) || [];
  const featured = featuredNews?.slice(0, 1) || [];

  return (
    <>
      {/* <Helmet>
        <title>News & Events - Ramanujan College | Latest Updates & Campus Activities - University of Delhi</title>
        <meta name="description" content="Stay updated with latest news, events, and announcements from Ramanujan College. Get information about campus activities, achievements, and important updates." />
      </Helmet> */}

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif" data-testid="page-title">
                News & Events
              </h1>
              <p className="text-xl opacity-90" data-testid="page-subtitle">
                Stay Connected with Campus Life & Achievements
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Featured News & Recent Articles */}
              <div className="lg:col-span-2">
                <Tabs defaultValue="news" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-8" data-testid="news-tabs">
                    <TabsTrigger value="news" data-testid="tab-news">Latest News</TabsTrigger>
                    <TabsTrigger value="featured" data-testid="tab-featured">Featured</TabsTrigger>
                  </TabsList>

                  <TabsContent value="news">
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold font-serif" data-testid="latest-news-title">Latest News</h2>
                      
                      {newsLoading ? (
                        <div className="space-y-6">
                          {[...Array(3)].map((_, i) => (
                            <Card key={i} className="overflow-hidden">
                              <div className="md:flex">
                                <Skeleton className="h-48 md:w-48 md:h-auto" />
                                <div className="p-6 flex-1">
                                  <Skeleton className="h-4 w-3/4 mb-4" />
                                  <Skeleton className="h-6 w-full mb-2" />
                                  <Skeleton className="h-4 w-2/3 mb-4" />
                                  <Skeleton className="h-3 w-1/2" />
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {recentNews.length > 0 ? (
                            recentNews.map((article, index) => (
                              <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow" data-testid={`news-article-${index}`}>
                                <div className="md:flex">
                                  {article.imageUrl && (
                                    <div className="md:w-48 h-48 md:h-auto bg-muted">
                                      <img 
                                        src={article.imageUrl} 
                                        alt={article.title}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                  )}
                                  <div className="p-6 flex-1">
                                    <div className="flex items-center gap-2 mb-3">
                                      <Badge variant="outline" data-testid={`news-category-${index}`}>
                                        {article.category}
                                      </Badge>
                                      {article.featured && (
                                        <Badge className="bg-accent text-accent-foreground" data-testid={`news-featured-${index}`}>
                                          <Star className="w-3 h-3 mr-1" />
                                          Featured
                                        </Badge>
                                      )}
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3">{article.title}</h3>
                                    <p className="text-muted-foreground mb-4">{article.excerpt}</p>
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center text-sm text-muted-foreground">
                                        <User className="w-4 h-4 mr-1" />
                                        <span className="mr-3">{article.author}</span>
                                        <Clock className="w-4 h-4 mr-1" />
                                        <span>
                                          {article.publishedAt && formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}
                                        </span>
                                      </div>
                                      <Button variant="link" className="p-0 h-auto text-primary" data-testid={`read-more-${index}`}>
                                        Read More
                                        <ArrowRight className="w-4 h-4 ml-1" />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </Card>
                            ))
                          ) : (
                            <Card className="p-12 text-center">
                              <Newspaper className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                              <h3 className="text-xl font-semibold mb-2">No News Available</h3>
                              <p className="text-muted-foreground">
                                Check back later for the latest news and updates.
                              </p>
                            </Card>
                          )}
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="featured">
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold font-serif" data-testid="featured-news-title">Featured Stories</h2>
                      
                      {featuredLoading ? (
                        <Card className="overflow-hidden">
                          <Skeleton className="h-64 w-full" />
                          <div className="p-6">
                            <Skeleton className="h-4 w-1/4 mb-4" />
                            <Skeleton className="h-8 w-3/4 mb-4" />
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-2/3" />
                          </div>
                        </Card>
                      ) : (
                        <>
                          {featured.length > 0 ? (
                            featured.map((article, index) => (
                              <Card key={article.id} className="overflow-hidden shadow-lg" data-testid={`featured-article-${index}`}>
                                {article.imageUrl && (
                                  <div className="h-64 bg-muted">
                                    <img 
                                      src={article.imageUrl} 
                                      alt={article.title}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                )}
                                <div className="p-6">
                                  <div className="flex items-center gap-2 mb-3">
                                    <Badge className="bg-accent text-accent-foreground">
                                      <Star className="w-3 h-3 mr-1" />
                                      Featured
                                    </Badge>
                                    <Badge variant="outline">{article.category}</Badge>
                                  </div>
                                  <h3 className="text-2xl font-bold mb-4">{article.title}</h3>
                                  <p className="text-muted-foreground mb-6">{article.excerpt}</p>
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center text-sm text-muted-foreground">
                                      <User className="w-4 h-4 mr-1" />
                                      <span className="mr-3">{article.author}</span>
                                      <Clock className="w-4 h-4 mr-1" />
                                      <span>
                                        {article.publishedAt && format(new Date(article.publishedAt), 'MMM dd, yyyy')}
                                      </span>
                                    </div>
                                    <Button data-testid={`read-featured-${index}`}>
                                      Read Full Story
                                      <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                  </div>
                                </div>
                              </Card>
                            ))
                          ) : (
                            <Card className="p-12 text-center">
                              <Star className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                              <h3 className="text-xl font-semibold mb-2">No Featured Stories</h3>
                              <p className="text-muted-foreground">
                                Featured stories will appear here when available.
                              </p>
                            </Card>
                          )}
                        </>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Upcoming Events */}
                <Card className="overflow-hidden" id="events">
                  <CardHeader className="bg-accent text-accent-foreground">
                    <CardTitle className="flex items-center">
                      <Calendar className="w-5 h-5 mr-2" />
                      Upcoming Events
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="max-h-80 overflow-y-auto" data-testid="upcoming-events">
                      {eventsLoading ? (
                        <div className="p-6 space-y-4">
                          {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex items-start space-x-3">
                              <Skeleton className="w-12 h-12 rounded" />
                              <div className="flex-1">
                                <Skeleton className="h-4 w-3/4 mb-2" />
                                <Skeleton className="h-3 w-1/2" />
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <>
                          {upcomingEvents.length > 0 ? (
                            <div className="p-6 space-y-4">
                              {upcomingEvents.map((event, index) => (
                                <div key={event.id} className="flex items-start space-x-3" data-testid={`upcoming-event-${index}`}>
                                  <div className="bg-primary text-primary-foreground rounded p-2 text-xs font-bold text-center min-w-[50px]">
                                    <div>{format(new Date(event.eventDate), 'MMM').toUpperCase()}</div>
                                    <div>{format(new Date(event.eventDate), 'dd')}</div>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-sm">{event.title}</h4>
                                    <p className="text-xs text-muted-foreground">{event.location}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{event.description}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="p-6 text-center text-muted-foreground">
                              <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
                              <p className="text-sm">No upcoming events at this time.</p>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                    <div className="px-6 py-4 bg-muted">
                      <Button variant="link" className="text-primary font-semibold text-sm p-0 h-auto" data-testid="view-all-events">
                        View All Events →
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Press Releases */}
                <Card className="overflow-hidden">
                  <CardHeader className="bg-secondary text-secondary-foreground">
                    <CardTitle className="flex items-center">
                      <Newspaper className="w-5 h-5 mr-2" />
                      Press Releases
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="max-h-80 overflow-y-auto" data-testid="press-releases">
                      <div className="p-6 space-y-4">
                        {pressReleases.map((release, index) => (
                          <div key={release.title} className="border-l-4 border-primary pl-4" data-testid={`press-release-${index}`}>
                            <h4 className="font-semibold text-sm mb-1">{release.title}</h4>
                            <p className="text-xs text-muted-foreground mb-1">{release.description}</p>
                            <p className="text-xs text-muted-foreground">{release.date}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="px-6 py-4 bg-muted">
                      <Button variant="link" className="text-primary font-semibold text-sm p-0 h-auto" data-testid="view-all-releases">
                        View All Releases →
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card className="p-6">
                  <CardTitle className="mb-4">Campus Highlights</CardTitle>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <TrendingUp className="w-4 h-4 mr-2 text-primary" />
                        <span className="text-sm">NIRF Ranking</span>
                      </div>
                      <Badge variant="outline">65th (2024)</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Award className="w-4 h-4 mr-2 text-accent" />
                        <span className="text-sm">NAAC Grade</span>
                      </div>
                      <Badge className="bg-accent text-accent-foreground">A++</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2 text-secondary" />
                        <span className="text-sm">Students</span>
                      </div>
                      <Badge variant="outline">2000+</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <BookOpen className="w-4 h-4 mr-2 text-primary" />
                        <span className="text-sm">Programs</span>
                      </div>
                      <Badge variant="outline">16+</Badge>
                    </div>
                  </div>
                </Card>

                {/* Newsletter Signup */}
                <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="flex items-center text-lg">
                      <Mail className="w-5 h-5 mr-2 text-primary" />
                      Stay Connected
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-sm text-muted-foreground mb-4">
                      Subscribe to our newsletter for the latest updates and announcements.
                    </p>
                    <div className="space-y-3">
                      <input 
                        type="email" 
                        placeholder="Enter your email" 
                        className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary"
                        data-testid="newsletter-email"
                      />
                      <Button className="w-full" data-testid="newsletter-subscribe">
                        Subscribe
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Archives & Categories */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 font-serif" data-testid="archives-title">
                News Archives & Categories
              </h2>
              <p className="text-lg text-muted-foreground">
                Browse news by category or explore our archives
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <TrendingUp className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Academic News</h3>
                <p className="text-sm text-muted-foreground mb-4">Academic achievements and updates</p>
                <Button variant="outline" size="sm" data-testid="academic-news">
                  Browse
                </Button>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <Users className="w-12 h-12 mx-auto mb-4 text-accent" />
                <h3 className="font-semibold mb-2">Student Life</h3>
                <p className="text-sm text-muted-foreground mb-4">Campus activities and events</p>
                <Button variant="outline" size="sm" data-testid="student-life-news">
                  Browse
                </Button>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <Award className="w-12 h-12 mx-auto mb-4 text-secondary" />
                <h3 className="font-semibold mb-2">Achievements</h3>
                <p className="text-sm text-muted-foreground mb-4">Awards and recognitions</p>
                <Button variant="outline" size="sm" data-testid="achievements-news">
                  Browse
                </Button>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <BookOpen className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Research</h3>
                <p className="text-sm text-muted-foreground mb-4">Research news and publications</p>
                <Button variant="outline" size="sm" data-testid="research-news">
                  Browse
                </Button>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
