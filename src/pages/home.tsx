import { Link } from "wouter";
import { motion } from "framer-motion";
import { Shield, Award, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AuditGallery from "@/components/AuditGallery";
import GlobeHero from "@/components/GlobeHero";

export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const services = [
    {
      icon: Shield,
      title: "GAP & EAC Compliance Audits",
      description:
        "Supreme Court & EAC aligned GAP audits with practical, audit-ready compliance solutions.",
      href: "/services",
    },
    {
      icon: Award,
      title: "ISO Audits, SA 8000 And Social Compliance Audits",
      description:
        "Occupational Health & Safety and Social Accountability systems implementation & support.",
      href: "/services",
    },
    {
      icon: Users,
      title: "Industry-Specific Expertise",
      description:
        "Strong exposure to Tanneries, IETPs, Textile units, and Manufacturing industries.",
      href: "/services",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-slate-950">
        {/* Globe Background - Positioned on Right Half */}
        <div className="absolute inset-0 w-full h-full z-0" style={{ transform: 'translateX(25%)' }}>
          <GlobeHero orbitText="SBM" isRotationEnabled />
        </div>

        {/* Dark overlay for text readability - pointer-events-none is key! */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/20 pointer-events-none z-10" />

        {/* Content Container */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 py-20 w-full pointer-events-none">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* -------- LEFT: TEXT CONTENT -------- */}
            <motion.div {...fadeInUp} className="max-w-xl pointer-events-auto">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Compliance with Confidence.
              </h1>

              <p className="text-xl md:text-2xl text-white/90 mb-8">
               Supporting industries in achieving GAP, EAC, ISO 45001 & SA 8000 compliance through practical audits and professional consultancy, including certification audits with accredited bodies such as BSI, DQS, DNV, SGS, and Intertek.
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <Link href="/services">
                  <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white">
                    View Our Services
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Contact Us
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 max-w-md">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-400">87+</div>
                  <div className="text-white/80 text-sm">
                    Companies Served
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-400">70</div>
                  <div className="text-white/80 text-sm">
                    Ongoing Assignments
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-400">25+</div>
                  <div className="text-white/80 text-sm">
                    Years Experience
                  </div>
                </div>
              </div>
            </motion.div>

            {/* -------- RIGHT: SPACE FOR GLOBE (visible through transparent background) -------- */}
            <div className="hidden lg:block pointer-events-none">
              {/* This empty div reserves space on the right for the globe to be visible */}
            </div>
          </div>
        </div>
      </section>

      {/* ================= ABOUT SECTION ================= */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">About SBM Services</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Founded by Mr. Shivakumar, MBA, MLM, SBM Services delivers practical
              GAP audits, compliance assessments, and consultancy aligned with
              Supreme Court, EAC, ISO, and statutory requirements across South
              India.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Link key={index} href={service.href}>
                <Card className="h-full cursor-pointer hover-elevate">
                  <CardHeader>
                    <service.icon className="h-8 w-8 text-accent mb-4" />
                    <CardTitle>{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <AuditGallery />
    </div>
  );
}