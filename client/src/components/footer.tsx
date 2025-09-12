import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        {/* Contact Information */}
        <div className="grid lg:grid-cols-4 gap-8 mb-12">
          {/* College Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-xl">
                RC
              </div>
              <div>
                <h3 className="text-xl font-bold">Ramanujan College</h3>
                <p className="text-sm opacity-80">University of Delhi</p>
              </div>
            </div>
            <p className="text-sm opacity-80 mb-6 max-w-md">
              A premier institution committed to academic excellence, holistic development, and 
              building a better world through education and innovation.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center hover:bg-primary/80 transition-colors"
                data-testid="social-facebook"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center hover:bg-primary/80 transition-colors"
                data-testid="social-twitter"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center hover:bg-primary/80 transition-colors"
                data-testid="social-instagram"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center hover:bg-primary/80 transition-colors"
                data-testid="social-youtube"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Information</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3" data-testid="contact-address">
                <MapPin className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                <div className="text-sm">
                  <div className="font-medium">Address</div>
                  <div className="opacity-80">Kalkaji, New Delhi - 110019</div>
                </div>
              </div>
              <div className="flex items-start space-x-3" data-testid="contact-phone">
                <Phone className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                <div className="text-sm">
                  <div className="font-medium">Phone</div>
                  <div className="opacity-80">+91-11-26430047</div>
                </div>
              </div>
              <div className="flex items-start space-x-3" data-testid="contact-email">
                <Mail className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                <div className="text-sm">
                  <div className="font-medium">Email</div>
                  <div className="opacity-80">info@ramanujancollege.ac.in</div>
                </div>
              </div>
              <div className="flex items-start space-x-3" data-testid="contact-hours">
                <Clock className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                <div className="text-sm">
                  <div className="font-medium">Office Hours</div>
                  <div className="opacity-80">Mon-Fri: 9:00 AM - 5:00 PM</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <div className="space-y-2">
              <Link 
                href="/admissions" 
                className="block text-sm opacity-80 hover:opacity-100 hover:text-primary transition-colors"
                data-testid="footer-link-admissions"
              >
                Admissions
              </Link>
              <Link 
                href="/academics#calendar" 
                className="block text-sm opacity-80 hover:opacity-100 hover:text-primary transition-colors"
                data-testid="footer-link-calendar"
              >
                Academic Calendar
              </Link>
              <Link 
                href="/students#timetables" 
                className="block text-sm opacity-80 hover:opacity-100 hover:text-primary transition-colors"
                data-testid="footer-link-timetables"
              >
                Time Tables
              </Link>
              <Link 
                href="/students#library" 
                className="block text-sm opacity-80 hover:opacity-100 hover:text-primary transition-colors"
                data-testid="footer-link-library"
              >
                Library
              </Link>
              <a 
                href="#" 
                className="block text-sm opacity-80 hover:opacity-100 hover:text-primary transition-colors"
                data-testid="footer-link-alumni"
              >
                Alumni
              </a>
              <a 
                href="#" 
                className="block text-sm opacity-80 hover:opacity-100 hover:text-primary transition-colors"
                data-testid="footer-link-anti-ragging"
              >
                Anti-Ragging
              </a>
              <a 
                href="#" 
                className="block text-sm opacity-80 hover:opacity-100 hover:text-primary transition-colors"
                data-testid="footer-link-rti"
              >
                RTI
              </a>
              <a 
                href="#" 
                className="block text-sm opacity-80 hover:opacity-100 hover:text-primary transition-colors"
                data-testid="footer-link-tenders"
              >
                Tenders
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-600 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-sm opacity-80" data-testid="copyright">
              © 2024 Ramanujan College, University of Delhi. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a 
                href="#" 
                className="opacity-80 hover:opacity-100 hover:text-primary transition-colors"
                data-testid="footer-privacy"
              >
                Privacy Policy
              </a>
              <a 
                href="#" 
                className="opacity-80 hover:opacity-100 hover:text-primary transition-colors"
                data-testid="footer-terms"
              >
                Terms of Service
              </a>
              <a 
                href="#" 
                className="opacity-80 hover:opacity-100 hover:text-primary transition-colors"
                data-testid="footer-accessibility"
              >
                Accessibility
              </a>
              <a 
                href="#" 
                className="opacity-80 hover:opacity-100 hover:text-primary transition-colors"
                data-testid="footer-sitemap"
              >
                Site Map
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
