// import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Award, Users, Building, FileText, BookOpen } from "lucide-react";

export default function About() {
  return (
    <>
      {/* <Helmet>
        <title>About Ramanujan College | History, Vision & Mission - University of Delhi</title>
        <meta name="description" content="Learn about Ramanujan College's rich history since 1958, our vision and mission, NAAC A++ accreditation, and commitment to academic excellence at University of Delhi." />
      </Helmet> */}

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif" data-testid="page-title">
                About Ramanujan Junior College
              </h1>
              <p className="text-xl opacity-90" data-testid="page-subtitle">
                Education, Development and Progress
              </p>
              <Badge className="mt-4 bg-accent text-accent-foreground" data-testid="naac-badge">
                Established 2005 - Co-Educational Excellence
              </Badge>
            </div>
          </div>
        </section>

        {/* History Section */}
        <section id="history" className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center font-serif" data-testid="history-title">
                Our History
              </h2>
              
              <div className="mb-12">
                <p className="text-muted-foreground mb-4 text-lg">
                  Ramanujan Junior College, founded in 2005, stands true to its motto - <strong className="text-primary">"Education, Development and Progress"</strong> along with a long-cherished desire to impart quality education. The emphasis is laid on success in a competitive educational field. Its ultimate goal is to pave the way for a splendid career.
                </p>
                <p className="text-muted-foreground mb-6 text-lg">
                  Primarily the college was started as a coaching institute named <strong>Ramanujan Academy in 2003</strong>. It is worthwhile to mention that the academy achieved immense response from the society and later on it was decided to give birth to a junior college named Ramanujan Junior College, comprising of both science and arts stream, in the year 2005. Now, Ramanujan is on a dual service - Ramanujan Junior College and Ramanujan Academy, both are co-educational.
                </p>
              </div>

              {/* Timeline */}
              <div className="space-y-8" data-testid="timeline">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                    <Calendar className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">2003 - Ramanujan Academy</h3>
                    <p className="text-muted-foreground">
                      Started as a coaching institute named Ramanujan Academy, achieving immense response from society with a focus on competitive examination preparation.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-accent rounded-full flex items-center justify-center">
                    <Building className="w-8 h-8 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">2005 - Junior College Established</h3>
                    <p className="text-muted-foreground">
                      Founded Ramanujan Junior College with both Science and Arts streams, providing comprehensive higher secondary education alongside competitive exam coaching.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-secondary rounded-full flex items-center justify-center">
                    <FileText className="w-8 h-8 text-secondary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">2005 - AHSEC Permission</h3>
                    <p className="text-muted-foreground">
                      Acquired permission from A.H.S.E.C to start H.S. 1st year Arts and Science classes (No. A.H.S.E.C / RER / PERM / NEW / 0506 / 6707 / dated 28/04/2005).
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                    <Award className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">2010-2011 - Full Recognition</h3>
                    <p className="text-muted-foreground">
                      Achieved govt. Registration (No. AS - 02 - JC - 74 dated 25/02/2010) and full Recognition from AHSEC (No. AHSEC/RPR/RRC/60/07/9327(A), dtd-20/09/2011).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Objectives Section */}
        <section id="objectives" className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 font-serif" data-testid="vision-mission-title">
                Objectives of the College
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Our commitment to academic excellence and holistic student development
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              <Card className="p-6">
                <CardContent className="pt-6">
                  <ul className="space-y-4 text-muted-foreground">
                    <li className="flex items-start" data-testid="objective-1">
                      <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>To enable the students to understand the basic concept of the core subjects.</span>
                    </li>
                    <li className="flex items-start" data-testid="objective-2">
                      <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>To equip and guide the students to apply the basic concept acquired.</span>
                    </li>
                    <li className="flex items-start" data-testid="objective-3">
                      <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Due to the intensive, extensive, and analytical coaching in each subject by the permanent and qualified faculties, the students are able to prepare for all India level competitive examinations such as JEE (Mains & Advance) and All India Medical Examination.</span>
                    </li>
                    <li className="flex items-start" data-testid="objective-4">
                      <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>To enable the students to acquire the skill of problem analysis in an examination environment and to ensure their optimum all-round performance.</span>
                    </li>
                    <li className="flex items-start" data-testid="objective-5">
                      <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Regular interaction with guardians by the management for monitoring the students and building a rapport between the teachers and the students to create a healthy teaching and learning environment.</span>
                    </li>
                    <li className="flex items-start" data-testid="objective-6">
                      <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>The committed and qualified faculty working on a permanent basis conducts periodical tests to help the students to be mentally alert and emotionally balanced to face the toughest entrance examinations with confidence in the future.</span>
                    </li>
                    <li className="flex items-start" data-testid="objective-7">
                      <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>To provide moral education with a view to preparing the students to face real life situations.</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Leadership & Management */}
        <section id="leadership" className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 font-serif" data-testid="leadership-title">
                Leadership & Management
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Ramanujan Junior College is run by "Ramanujan Society of Education, Social and Rural Development", a non-government organization (Registered under Societies Registration Act 1860, bearing registration No. RS/NG/254/F/47 of 2004-2005).
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card className="p-6" data-testid="principal-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="w-6 h-6 mr-2 text-primary" />
                      Principal & Secretary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold text-lg mb-2">Mr. Dilip Kumar Borah</p>
                    <p className="text-muted-foreground mb-3">M.Sc., B.Ed. (NET qualified)</p>
                    <div className="space-y-1 text-sm">
                      <p className="text-muted-foreground">
                        <span className="font-medium">Phone:</span> 9435162455
                      </p>
                      <p className="text-muted-foreground">
                        <span className="font-medium">WhatsApp:</span> 9864750236
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="p-6" data-testid="vice-principal-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="w-6 h-6 mr-2 text-accent" />
                      Vice Principal
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold text-lg mb-2">Mrs. Sangeeta Baruah Bora</p>
                    <p className="text-muted-foreground mb-3">M.A</p>
                    <div className="space-y-1 text-sm">
                      <p className="text-muted-foreground">
                        <span className="font-medium">Phone:</span> 9864240898
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="p-6" data-testid="controller-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="w-6 h-6 mr-2 text-primary" />
                      Controller of Examination
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold text-lg mb-2">Mr. Parag Borah</p>
                    <p className="text-muted-foreground mb-3">M.Sc, B.Ed</p>
                    <div className="space-y-1 text-sm">
                      <p className="text-muted-foreground">
                        <span className="font-medium">Phone:</span> 8822140960
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="p-6" data-testid="coordinator-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BookOpen className="w-6 h-6 mr-2 text-accent" />
                      Co-ordinator (Entrance Base Test)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold text-lg mb-2">Mr. Parag Borah</p>
                    <p className="text-muted-foreground mb-3">M.Sc, B.Ed</p>
                    <div className="space-y-1 text-sm">
                      <p className="text-muted-foreground">
                        <span className="font-medium">Phone:</span> 8822140960
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="p-6" data-testid="joint-coordinator-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="w-6 h-6 mr-2 text-primary" />
                      Joint Co-ordinator
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold text-lg mb-2">Mr. Parag Paran Saikia</p>
                    <p className="text-muted-foreground mb-3">M.Sc</p>
                    <div className="space-y-1 text-sm">
                      <p className="text-muted-foreground">
                        <span className="font-medium">Phone:</span> 8486753110
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="p-6" data-testid="career-counsellor-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Award className="w-6 h-6 mr-2 text-accent" />
                      Career Counsellor
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold text-lg mb-2">Mr. Ankush Kahar</p>
                    <p className="text-muted-foreground mb-3">B.Tech (USA)</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
