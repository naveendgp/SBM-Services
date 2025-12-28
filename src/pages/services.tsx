import { motion } from "framer-motion";
import { Shield, GraduationCap, Factory, CheckCircle, FileCheck, Users, Flame, Zap, HeartPulse, HardHat } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Services() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const auditServices = [
    { icon: CheckCircle, title: "Compliance", description: "Comprehensive internal audit services to identify gaps and ensure compliance" },
    { icon: FileCheck, title: "Internal Audits", description: "Third-party audit preparation and support for certification success" },
    { icon: Shield, title: "ISO 14001", description: "Ensure adherence to all applicable legal and regulatory requirements" },
    { icon: Users, title: "ISO 45001", description: "Supplier Ethical Data Exchange compliance assessments" },
    { icon: CheckCircle, title: "ISO 5001", description: "Business Social Compliance Initiative audits for ethical trading" },
    { icon: Shield, title: "Social Compliance", description: "Worldwide Responsible Accredited Production certification support" },
  ];

  const trainingServices = [
    { icon: GraduationCap, title: "ISO 14001 Training", description: "Environmental Management Systems implementation and best practices" },
    { icon: Flame, title: "Fire Safety Training", description: "Comprehensive fire prevention, detection, and emergency response training" },
    { icon: Zap, title: "H₂S Safety", description: "Hydrogen Sulfide awareness and safety protocols for hazardous environments" },
    { icon: HardHat, title: "PPE Training", description: "Personal Protective Equipment selection, usage, and maintenance" },
    { icon: HeartPulse, title: "First Aid Training", description: "Emergency response and workplace first aid certification" },
    { icon: Zap, title: "Electrical Safety", description: "Electrical hazard awareness and safe work practices" },
  ];

  const industries = [
    { icon: Factory, title: "Textile Industry", description: "Specialized compliance and safety solutions for textile manufacturing" },
    { icon: Factory, title: "Leather Industry", description: "Environmental and safety compliance for leather processing facilities" },
    { icon: Factory, title: "Engineering Sector", description: "Occupational safety and quality management for engineering firms" },
    { icon: Factory, title: "MSMEs", description: "Tailored compliance solutions for Micro, Small, and Medium Enterprises" },
  ];

  return (
    <div className="min-h-screen">
      <section className="bg-primary py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6" data-testid="heading-services">
              Our Services
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto" data-testid="text-services-subtitle">
              Comprehensive audit, compliance, and training solutions tailored to your industry
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            {...fadeInUp}
            className="text-center mb-12"
          >
            <div className="w-16 h-16 rounded-md bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-accent" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Audit & Compliance Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Ensure your organization meets international standards and regulatory requirements
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {auditServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="h-full hover-elevate active-elevate-2 transition-all duration-300" data-testid={`card-audit-service-${index}`}>
                  <CardHeader>
                    <div className="w-12 h-12 rounded-md bg-accent/10 flex items-center justify-center mb-3">
                      <service.icon className="h-6 w-6 text-accent" data-testid={`icon-audit-service-${index}`} />
                    </div>
                    <CardTitle className="text-lg" data-testid={`title-audit-service-${index}`}>{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription data-testid={`description-audit-service-${index}`}>{service.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            {...fadeInUp}
            className="text-center mb-12"
          >
            <div className="w-16 h-16 rounded-md bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="h-8 w-8 text-accent" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Training Capabilities
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Expert-led training programs to build a culture of safety and compliance
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainingServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="h-full hover-elevate active-elevate-2 transition-all duration-300" data-testid={`card-training-service-${index}`}>
                  <CardHeader>
                    <div className="w-12 h-12 rounded-md bg-accent/10 flex items-center justify-center mb-3">
                      <service.icon className="h-6 w-6 text-accent" data-testid={`icon-training-service-${index}`} />
                    </div>
                    <CardTitle className="text-lg" data-testid={`title-training-service-${index}`}>{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription data-testid={`description-training-service-${index}`}>{service.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            {...fadeInUp}
            className="text-center mb-12"
          >
            <div className="w-16 h-16 rounded-md bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <Factory className="h-8 w-8 text-accent" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Industry Experience
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Deep expertise across multiple sectors and industry verticals
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="h-full hover-elevate active-elevate-2 transition-all duration-300" data-testid={`card-industry-${index}`}>
                  <CardHeader>
                    <div className="w-12 h-12 rounded-md bg-accent/10 flex items-center justify-center mb-3">
                      <industry.icon className="h-6 w-6 text-accent" data-testid={`icon-industry-${index}`} />
                    </div>
                    <CardTitle className="text-lg" data-testid={`title-industry-${index}`}>{industry.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription data-testid={`description-industry-${index}`}>{industry.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            {...fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Custom Solutions for Your Business
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Every organization is unique. We tailor our services to meet your specific compliance 
              and training requirements.
            </p>
            <a href="/contact">
              <button
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-accent text-accent-foreground hover:bg-accent/90 h-10 px-8 border border-accent-border"
                data-testid="button-discuss-needs"
              >
                Discuss Your Needs
              </button>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
