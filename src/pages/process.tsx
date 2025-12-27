import { motion } from "framer-motion";
import { Search, FileSearch, ClipboardCheck, GraduationCap, ListChecks } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function Process() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const steps: { number: string; icon: ComponentType<SVGProps<SVGSVGElement>>; title: string; description: string }[] = [
    {
      number: "01",
      icon: Search,
      title: "Initial Assessment",
      description: "We begin with a comprehensive evaluation of your current compliance status, identifying your organization's specific needs and objectives.",
    },
    {
      number: "02",
      icon: FileSearch,
      title: "Gap Analysis",
      description: "Conduct detailed gap analysis to identify discrepancies between current practices and required standards, prioritizing areas for improvement.",
    },
    {
      number: "03",
      icon: ClipboardCheck,
      title: "Audit Execution",
      description: "Perform thorough internal or external audits using industry best practices, documenting findings and evidence systematically.",
    },
    {
      number: "04",
      icon: GraduationCap,
      title: "Training Delivery",
      description: "Provide customized training sessions to your team, ensuring they understand compliance requirements and safety protocols.",
    },
    {
      number: "05",
      icon: ListChecks,
      title: "CAPA Planning",
      description: "Develop Corrective and Preventive Action plans to address identified issues and establish continuous improvement processes.",
    },
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
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6" data-testid="heading-process">
              Our Process
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto" data-testid="text-process-subtitle">
              A systematic approach to achieving and maintaining compliance excellence
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-background ">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            {...fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="heading-methodology">
              Our 5-Step Methodology
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto" data-testid="text-methodology-subtitle">
              A proven framework that ensures thorough assessment, effective implementation, 
              and sustainable compliance
            </p>
          </motion.div>

          <div className="hidden lg:block ">
            <div className="relative">
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-accent/20 -translate-y-1/2 mt-6" />
              
              <div className="grid grid-cols-5 gap-8 relative">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.1 * index }}
                      className="relative"
                      data-testid={`process-step-${index}`}
                    >
                      <div className="flex flex-col items-center">
                        <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mb-4 relative z-10 border-4 border-background">
                          <Icon className="h-10 w-10 text-accent-foreground" data-testid={`process-icon-${index}`} />
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-bold text-accent mb-2" data-testid={`process-number-${index}`}>{step.number}</div>
                          <h3 className="text-lg font-bold text-foreground mb-2" data-testid={`process-title-${index}`}>{step.title}</h3>
                          <p className="text-sm text-muted-foreground" data-testid={`process-description-${index}`}>{step.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:hidden space-y-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <Card data-testid={`process-step-mobile-${index}`}>
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center">
                            <Icon className="h-8 w-8 text-accent-foreground" data-testid={`process-icon-mobile-${index}`} />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-bold text-accent mb-1" data-testid={`process-number-mobile-${index}`}>{step.number}</div>
                          <h3 className="text-xl font-bold text-foreground mb-2" data-testid={`process-title-mobile-${index}`}>{step.title}</h3>
                          <p className="text-muted-foreground" data-testid={`process-description-mobile-${index}`}>{step.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            {...fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Our Process Works
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              {...fadeInUp}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card>
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold text-foreground mb-3">Systematic Approach</h3>
                  <p className="text-muted-foreground">
                    Each step builds upon the previous one, ensuring comprehensive coverage and 
                    sustainable results.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              {...fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold text-foreground mb-3">Proven Methodology</h3>
                  <p className="text-muted-foreground">
                    Our process has been refined through years of experience across diverse industries 
                    and compliance frameworks.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              {...fadeInUp}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold text-foreground mb-3">Continuous Improvement</h3>
                  <p className="text-muted-foreground">
                    We don't just identify issues—we help you build systems for ongoing compliance 
                    and performance enhancement.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            {...fadeInUp}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Start Your Compliance Journey?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Let us guide you through each step with expertise and professionalism
            </p>
            <a href="/contact">
              <button
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-8 border border-primary-border"
                data-testid="button-start-journey"
              >
                Get Started Today
              </button>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
