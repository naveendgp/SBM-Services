import { motion } from "framer-motion";
import { Award, Target, Users, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const stats = [
    { value: "25+", label: "Years of Corporate Experience", icon: Award },
    { value: "87+", label: "Companies Successfully Completed", icon: Users },
    { value: "70", label: "Ongoing Compliance Assignments", icon: TrendingUp },
    { value: "100%", label: "Ethical & Transparent Audits", icon: Target },
  ];

  return (
    <div className="min-h-screen">
      <section className="bg-primary py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-primary-foreground mb-4">
            About SBM Services
          </h1>
          <p className="text-xl text-primary-foreground/90">
            Professional Compliance Audits & Consultancy
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          <motion.div {...fadeInUp}>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-muted-foreground mb-4">
              SBM Services is a professional compliance audit and consultancy firm founded by
              Mr. Shivakumar, MBA, MLM, with a mission to support industries in achieving legal,
              environmental, social, and safety compliance.
            </p>
            <p className="text-muted-foreground">
              With over 25 years of corporate experience in HR & Industrial Relations, SBM Services
              delivers practical GAP audits, internal assessments, and audit-ready solutions aligned
              with Supreme Court, EAC, ISO, and statutory requirements.
            </p>
          </motion.div>

          <motion.div {...fadeInUp}>
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-2">
                  Mr. Shivakumar, MBA, MLM
                </h3>
                <p className="text-muted-foreground mb-4">
                  Founder & Lead Auditor – ISO 45001 | SA 8000
                </p>
                <p className="text-muted-foreground">
                  With over 25 years of extensive experience in HR & Industrial Relations across
                  reputed corporate organizations, Mr. Shivakumar brings deep industry knowledge,
                  regulatory expertise, and practical compliance solutions to industries across
                  South India.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div key={index} {...fadeInUp}>
              <Card className="text-center">
                <CardContent className="p-6">
                  <stat.icon className="h-8 w-8 text-accent mx-auto mb-4" />
                  <div className="text-3xl font-bold text-accent">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-background text-center max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
        <p className="text-muted-foreground mb-10">
          To support industries in achieving legal, environmental, social, and safety compliance
          through practical GAP audits, internal assessments, and professional consultancy.
        </p>

        <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
        <p className="text-muted-foreground">
          To be a trusted compliance and audit partner for industries across India, recognized for
          integrity, technical expertise, and practical implementation.
        </p>
      </section>
    </div>
  );
}
