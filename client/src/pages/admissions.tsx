// import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Calendar, 
  IndianRupee, 
  Users, 
  Clock, 
  CheckCircle, 
  Download,
  ExternalLink,
  GraduationCap,
  Star,
  Phone,
  Mail,
  MapPin
} from "lucide-react";

export default function Admissions() {
  const admissionSteps = [
    {
      step: 1,
      title: "Check Eligibility",
      description: "Verify eligibility criteria for your desired program"
    },
    {
      step: 2,
      title: "Download Prospectus",
      description: "Get detailed information about courses and admission process"
    },
    {
      step: 3,
      title: "Fill Application",
      description: "Complete the online application form with required details"
    },
    {
      step: 4,
      title: "Document Verification",
      description: "Submit required documents for verification"
    },
    {
      step: 5,
      title: "Merit List",
      description: "Check merit lists and counseling schedule"
    },
    {
      step: 6,
      title: "Admission Confirmation",
      description: "Complete fee payment and secure your admission"
    }
  ];

  const quotaCategories = [
    {
      title: "General Merit",
      description: "Based on academic performance in qualifying examination",
      percentage: "Open Merit"
    },
    {
      title: "ECA Quota",
      description: "Extra-Curricular Activities including sports, music, dance, theatre",
      percentage: "5%"
    },
    {
      title: "Sports Quota",
      description: "Outstanding achievements in various sports disciplines",
      percentage: "5%"
    },
    {
      title: "CW Quota",
      description: "Children/Widows of Armed Forces Personnel",
      percentage: "5%"
    }
  ];

  const documents = [
    "Class X Mark Sheet and Certificate",
    "Class XII Mark Sheet and Certificate",
    "Transfer Certificate",
    "Character Certificate",
    "Category Certificate (if applicable)",
    "Sports/ECA Achievement Certificates",
    "Passport Size Photographs",
    "Aadhar Card Copy"
  ];

  return (
    <>
      {/* <Helmet>
        <title>Admissions - Ramanujan College | Apply for Undergraduate Programs - University of Delhi</title>
        <meta name="description" content="Apply for admission to Ramanujan College, University of Delhi. Get information about admission process, eligibility criteria, fee structure, and important dates for undergraduate programs." />
      </Helmet> */}

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif" data-testid="page-title">
                Admissions 2025-26
              </h1>
              <p className="text-xl opacity-90 mb-6" data-testid="page-subtitle">
                Join Our Academic Excellence Journey
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Badge className="bg-accent text-accent-foreground px-4 py-2" data-testid="naac-badge">
                  NAAC A++ Grade
                </Badge>
                <Badge className="bg-secondary text-secondary-foreground px-4 py-2" data-testid="nirf-badge">
                  NIRF Ranked
                </Badge>
                <Badge className="bg-accent text-accent-foreground px-4 py-2" data-testid="du-badge">
                  University of Delhi
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Important Dates */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 font-serif" data-testid="dates-title">
                Important Dates
              </h2>
              <p className="text-lg text-muted-foreground">
                Keep track of crucial admission deadlines and events
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center p-6" data-testid="date-application-start">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Application Starts</h3>
                <p className="text-2xl font-bold text-primary mb-2">May 15</p>
                <p className="text-sm text-muted-foreground">2025</p>
              </Card>

              <Card className="text-center p-6" data-testid="date-application-end">
                <Clock className="w-12 h-12 mx-auto mb-4 text-accent" />
                <h3 className="font-semibold mb-2">Application Ends</h3>
                <p className="text-2xl font-bold text-accent mb-2">June 30</p>
                <p className="text-sm text-muted-foreground">2025</p>
              </Card>

              <Card className="text-center p-6" data-testid="date-merit-list">
                <Users className="w-12 h-12 mx-auto mb-4 text-secondary" />
                <h3 className="font-semibold mb-2">Merit List</h3>
                <p className="text-2xl font-bold text-secondary mb-2">July 15</p>
                <p className="text-sm text-muted-foreground">2025</p>
              </Card>

              <Card className="text-center p-6" data-testid="date-classes-begin">
                <GraduationCap className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Classes Begin</h3>
                <p className="text-2xl font-bold text-primary mb-2">August 1</p>
                <p className="text-sm text-muted-foreground">2025</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Admission Process */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 font-serif" data-testid="process-title">
                Admission Process
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Follow these simple steps to secure your admission at Ramanujan College
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {admissionSteps.map((step, index) => (
                <Card key={step.step} className="p-6 text-center hover:shadow-lg transition-shadow" data-testid={`admission-step-${index}`}>
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold text-xl">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Programs & Eligibility */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 font-serif" data-testid="programs-title">
                Programs & Eligibility
              </h2>
              <p className="text-lg text-muted-foreground">
                Explore our undergraduate programs and their eligibility criteria
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="p-8">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="text-2xl">Undergraduate Programs</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-4">
                    <div className="border-l-4 border-primary pl-4">
                      <h4 className="font-semibold">Arts & Humanities</h4>
                      <p className="text-sm text-muted-foreground">B.A. (Hons.) in English, Hindi, Political Science, Philosophy, Applied Psychology</p>
                    </div>
                    <div className="border-l-4 border-accent pl-4">
                      <h4 className="font-semibold">Commerce</h4>
                      <p className="text-sm text-muted-foreground">B.Com (Hons.), B.Com (Prog.), BMS</p>
                    </div>
                    <div className="border-l-4 border-secondary pl-4">
                      <h4 className="font-semibold">Science</h4>
                      <p className="text-sm text-muted-foreground">B.Sc. (Hons.) in Mathematics, Statistics, Computer Science, Environmental Science</p>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <h4 className="font-semibold">Vocational</h4>
                      <p className="text-sm text-muted-foreground">B.Voc in Banking Operations, Software Development</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-8">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="text-2xl">General Eligibility</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-3 mt-0.5 text-primary" />
                      <span className="text-sm">Passed Class XII from a recognized board</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-3 mt-0.5 text-primary" />
                      <span className="text-sm">Minimum aggregate as per program requirements</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-3 mt-0.5 text-primary" />
                      <span className="text-sm">Subject-specific requirements for Honours programs</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-3 mt-0.5 text-primary" />
                      <span className="text-sm">Valid CUET score (as per University norms)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-3 mt-0.5 text-primary" />
                      <span className="text-sm">Age limit as prescribed by University of Delhi</span>
                    </li>
                  </ul>
                  <Button className="mt-6 w-full" data-testid="detailed-eligibility">
                    View Detailed Eligibility Criteria
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Fee Structure */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 font-serif" data-testid="fee-title">
                Fee Structure 2025-26
              </h2>
              <p className="text-lg text-muted-foreground">
                Transparent and affordable fee structure for all programs
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Card className="overflow-hidden">
                <CardHeader className="bg-primary text-primary-foreground">
                  <CardTitle className="flex items-center">
                    <IndianRupee className="w-6 h-6 mr-2" />
                    Annual Fee Structure
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full" data-testid="fee-table">
                      <thead className="bg-muted">
                        <tr>
                          <th className="text-left p-4 font-semibold">Program</th>
                          <th className="text-right p-4 font-semibold">Annual Fee</th>
                          <th className="text-right p-4 font-semibold">One-time Fee</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-4">B.A. (Honours) / B.A. (Programme)</td>
                          <td className="text-right p-4">₹12,000</td>
                          <td className="text-right p-4">₹2,000</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-4">B.Com (Honours) / B.Com (Programme)</td>
                          <td className="text-right p-4">₹15,000</td>
                          <td className="text-right p-4">₹2,000</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-4">B.Sc. (Honours)</td>
                          <td className="text-right p-4">₹18,000</td>
                          <td className="text-right p-4">₹2,500</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-4">BMS / B.Voc</td>
                          <td className="text-right p-4">₹20,000</td>
                          <td className="text-right p-4">₹3,000</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="p-4 bg-muted text-sm text-muted-foreground">
                    * Fees are subject to revision as per University guidelines. Additional charges may apply for laboratory courses.
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Quota Information */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 font-serif" data-testid="quota-title">
                Admission Quotas
              </h2>
              <p className="text-lg text-muted-foreground">
                Multiple pathways for admission based on merit and special categories
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quotaCategories.map((quota, index) => (
                <Card key={quota.title} className="p-6 text-center hover:shadow-lg transition-shadow" data-testid={`quota-${index}`}>
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">{quota.title}</h3>
                  <Badge variant="outline" className="mb-3">{quota.percentage}</Badge>
                  <p className="text-sm text-muted-foreground">{quota.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Required Documents */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 font-serif" data-testid="documents-title">
                Required Documents
              </h2>
              <p className="text-lg text-muted-foreground">
                Ensure you have all necessary documents ready for the admission process
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <Card className="p-8">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="flex items-center text-2xl">
                    <FileText className="w-6 h-6 mr-2 text-primary" />
                    Document Checklist
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-2 gap-4">
                    {documents.map((document, index) => (
                      <div key={document} className="flex items-center" data-testid={`document-${index}`}>
                        <CheckCircle className="w-5 h-5 mr-3 text-primary flex-shrink-0" />
                        <span className="text-sm">{document}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-accent/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>Note:</strong> All documents should be self-attested. Original documents will be verified at the time of admission.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Downloads & Links */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 font-serif" data-testid="downloads-title">
                Downloads & Links
              </h2>
              <p className="text-lg text-muted-foreground">
                Important forms and information for the admission process
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <Download className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Prospectus 2025-26</h3>
                <p className="text-sm text-muted-foreground mb-4">Complete admission guide with course details</p>
                <Button variant="outline" data-testid="download-prospectus">
                  Download PDF
                </Button>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <ExternalLink className="w-12 h-12 mx-auto mb-4 text-accent" />
                <h3 className="font-semibold mb-2">Online Application</h3>
                <p className="text-sm text-muted-foreground mb-4">Apply online through University portal</p>
                <Button variant="outline" data-testid="apply-online">
                  Apply Now
                </Button>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <FileText className="w-12 h-12 mx-auto mb-4 text-secondary" />
                <h3 className="font-semibold mb-2">Merit Lists</h3>
                <p className="text-sm text-muted-foreground mb-4">Check published merit lists and cutoffs</p>
                <Button variant="outline" data-testid="check-merit">
                  Check Lists
                </Button>
              </Card>
            </div>
          </div>
        </section>

        {/* Admission Helpdesk */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 font-serif" data-testid="helpdesk-title">
                Admission Helpdesk
              </h2>
              <p className="text-lg text-muted-foreground">
                Get assistance with your admission queries and application process
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Card className="p-8">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Phone className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="font-semibold mb-2">Phone Support</h3>
                    <p className="text-sm text-muted-foreground mb-2">+91-11-26430047</p>
                    <p className="text-xs text-muted-foreground">Mon-Fri: 9:00 AM - 5:00 PM</p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                      <Mail className="w-8 h-8 text-accent-foreground" />
                    </div>
                    <h3 className="font-semibold mb-2">Email Support</h3>
                    <p className="text-sm text-muted-foreground mb-2">admissions@ramanujancollege.ac.in</p>
                    <p className="text-xs text-muted-foreground">Response within 24 hours</p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-8 h-8 text-secondary-foreground" />
                    </div>
                    <h3 className="font-semibold mb-2">Visit Us</h3>
                    <p className="text-sm text-muted-foreground mb-2">Kalkaji, New Delhi - 110019</p>
                    <p className="text-xs text-muted-foreground">Admission Office</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
