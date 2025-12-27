import { motion } from "framer-motion";
import { Award, Briefcase, GraduationCap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Team() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const teamMembers = [
    {
      name: "Sivakumar K",
      role: "Lead Auditor & Founder",
      credentials: "ISO 45001, 14001, SA 8000 Specialist",
      initials: "SK",
      description: "With over 25 years of extensive experience in HR and HSE management, Mr. Sivakumar brings unparalleled expertise in ISO compliance and safety standards. He has led over 85 successful internal audits and continues to guide organizations toward operational excellence.",
      icon: Award
    },
    {
      name: "Naveen Sakthi",
      role: "AI Engineer",
      credentials: "Technology Integration Specialist",
      initials: "NS",
      description: "Bringing cutting-edge AI and automation solutions to streamline audit processes and compliance management. Naveen focuses on leveraging technology to enhance efficiency and accuracy in our service delivery.",
      icon: Briefcase
    },
    {
      name: "Velmurugan",
      role: "Business Analyst",
      credentials: "MBA",
      initials: "VM",
      description: "Specializes in business process optimization and strategic planning for compliance initiatives. With an MBA background, Velmurugan helps clients align their compliance objectives with broader business goals.",
      icon: GraduationCap
    },
    {
      name: "Nandini",
      role: "Technical Consultant",
      credentials: "BE, M.Sc",
      initials: "NN",
      description: "Combines engineering expertise with scientific knowledge to provide comprehensive technical support for environmental and safety assessments. Nandini's academic background enables detailed analysis of complex compliance requirements.",
      icon: GraduationCap
    },
    {
      name: "Jayakumar",
      role: "Training Coordinator",
      credentials: "MA",
      initials: "JK",
      description: "Coordinates and delivers engaging training programs across various safety and compliance topics. With a Master's in Arts, Jayakumar excels in communication and knowledge transfer, ensuring effective learning outcomes.",
      icon: GraduationCap
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
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6" data-testid="heading-team">
              Our Team
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto" data-testid="text-team-subtitle">
              Meet the professionals dedicated to your compliance success
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            {...fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Expert Professionals
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our team combines decades of experience with diverse expertise to deliver 
              exceptional audit and training services
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="h-full hover-elevate active-elevate-2 transition-all duration-300" data-testid={`card-team-member-${index}`}>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center mb-4">
                      <Avatar className="h-24 w-24 mb-4 bg-accent/10 border-2 border-accent/20">
                        <AvatarFallback className="text-2xl font-bold text-accent bg-accent/10" data-testid={`avatar-team-member-${index}`}>
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="text-xl font-bold text-foreground mb-1" data-testid={`name-team-member-${index}`}>
                        {member.name}
                      </h3>
                      <div className="text-sm font-medium text-accent mb-2" data-testid={`role-team-member-${index}`}>{member.role}</div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                        <member.icon className="h-4 w-4" data-testid={`icon-team-member-${index}`} />
                        <span data-testid={`credentials-team-member-${index}`}>{member.credentials}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground text-center" data-testid={`description-team-member-${index}`}>
                      {member.description}
                    </p>
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
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Core Values
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              {...fadeInUp}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card>
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold text-foreground mb-3">Integrity</h3>
                  <p className="text-muted-foreground">
                    We uphold the highest ethical standards in all our audits and assessments, 
                    providing honest and objective evaluations.
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
                  <h3 className="text-xl font-bold text-foreground mb-3">Excellence</h3>
                  <p className="text-muted-foreground">
                    We strive for excellence in every engagement, continuously improving our 
                    methodologies and service delivery.
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
                  <h3 className="text-xl font-bold text-foreground mb-3">Partnership</h3>
                  <p className="text-muted-foreground">
                    We build long-term relationships with our clients, acting as trusted advisors 
                    in their compliance journey.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            {...fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Work With Our Expert Team
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Experience the difference that professional expertise and dedication can make
            </p>
            <a href="/contact">
              <button
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-8 border border-primary-border"
                data-testid="button-connect-team"
              >
                Connect With Us
              </button>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
