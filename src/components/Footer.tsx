import { Mail, Phone, MapPin } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-primary border-t border-primary-border">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <img src="/logo.png" alt="SBM Logo" className="h-18 w-20" />
            <div className="text-2xl font-bold text-primary-foreground mb-4">
              SBM <span className="text-accent">Services</span>
            </div>
            <p className="text-primary-foreground/80 text-sm">
              Professional ISO audit, compliance assessments, and safety training services
              with 25+ years of industry experience.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-primary-foreground mb-4">Quick Links</h3>
            <div className="flex flex-col gap-2">
              <Link href="/" data-testid="link-footer-home">
                <span className="text-sm text-primary-foreground/80 hover:text-accent transition-colors cursor-pointer">
                  Home
                </span>
              </Link>
              <Link href="/about" data-testid="link-footer-about">
                <span className="text-sm text-primary-foreground/80 hover:text-accent transition-colors cursor-pointer">
                  About Us
                </span>
              </Link>
              <Link href="/services" data-testid="link-footer-services">
                <span className="text-sm text-primary-foreground/80 hover:text-accent transition-colors cursor-pointer">
                  Services
                </span>
              </Link>
              <Link href="/contact" data-testid="link-footer-contact">
                <span className="text-sm text-primary-foreground/80 hover:text-accent transition-colors cursor-pointer">
                  Contact
                </span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-primary-foreground mb-4">Contact Info</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2">
                <Mail className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:sbmservice.co.in@gmail.com"
                  className="text-sm text-primary-foreground/80 hover:text-accent transition-colors"
                  data-testid="link-email"
                >
                  audit@sbmservice.co.in
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <a
                  href="tel:+919585500085"
                  className="text-sm text-primary-foreground/80 hover:text-accent transition-colors"
                  data-testid="link-phone"
                >
                  +91 95855 00085
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-sm text-primary-foreground/80">
                  No. 6, Bharathi Nagar, Walajapet,<br />Ranipet, TN - 632513
                </span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-sm text-primary-foreground/80">
                  <p className="text-accent">Branch Address</p>
                  No. 259, Gandhi Road<br />Kancheepuram, TN - 631501
                  
                <div className="flex items-start gap-2 mt-2">
                  <Phone className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                <a href="tel:044 47872283"
                  className="text-sm text-primary-foreground/80 hover:text-accent transition-colors"
                  data-testid="link-phone">044 47872283</a>
                </div>
                </span>

              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-primary-border">
          <p className="text-center text-sm text-primary-foreground/70">
            &copy; 2025 SBM Services. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
