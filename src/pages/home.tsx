import { Link } from "wouter";
import { motion } from "framer-motion";
import { Shield, Award, Users, CheckCircle, TrendingUp, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const services = [
    {
      icon: Shield,
      title: "GAP & EAC Compliance Audits",
      description: "Supreme Court & EAC aligned GAP audits with practical, audit-ready compliance solutions.",
      href: "/services"
    },
    {
      icon: Award,
      title: "ISO 45001 & SA 8000 Consultancy",
      description: "Occupational Health & Safety and Social Accountability systems implementation & support.",
      href: "/services"
    },
    {
      icon: Users,
      title: "Industry-Specific Expertise",
      description: "Strong exposure to Tanneries, IETPs, Textile units, and Manufacturing industries.",
      href: "/services"
    }
  ];

  return (
    <div className="min-h-screen">
      <section className="relative bg-primary min-h-[85vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/95 to-primary" />

        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <motion.div {...fadeInUp} className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
              Compliance with Confidence.
            </h1>

            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8">
              Supporting industries in achieving GAP, EAC, ISO 45001 & SA 8000 compliance through
              practical audits and professional consultancy.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/services">
                <Button size="lg" className="bg-accent text-accent-foreground">
                  View Our Services
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-3 gap-8 mt-16 max-w-3xl"
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-accent">87+</div>
              <div className="text-primary-foreground/80">Companies Served</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent">70</div>
              <div className="text-primary-foreground/80">Ongoing Assignments</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent">25+</div>
              <div className="text-primary-foreground/80">Years Experience</div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">About SBM Services</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Founded by Mr. Shivakumar, MBA, MLM, SBM Services delivers practical GAP audits,
              compliance assessments, and consultancy aligned with Supreme Court, EAC, ISO, and
              statutory requirements across South India.
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
                    <CardDescription>{service.description}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
