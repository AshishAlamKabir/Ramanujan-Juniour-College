import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ScrollToTop from "@/components/scroll-to-top";
import Home from "@/pages/home";
import About from "@/pages/about";
import Academics from "@/pages/academics";
import Admissions from "@/pages/admissions";
import Students from "@/pages/students";
import News from "@/pages/news";
import Contact from "@/pages/contact";
import Teachers from "@/pages/teachers";
import Login from "@/pages/login";
import Signup from "@/pages/signup";
import Dashboard from "@/pages/dashboard";
import RateTeacher from "@/pages/rate-teacher";
import Payments from "@/pages/payments";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/academics" component={Academics} />
          <Route path="/teachers" component={Teachers} />
          <Route path="/admissions" component={Admissions} />
          <Route path="/students" component={Students} />
          <Route path="/news" component={News} />
          <Route path="/contact" component={Contact} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/rate/:token" component={RateTeacher} />
          <Route path="/payments" component={Payments} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
