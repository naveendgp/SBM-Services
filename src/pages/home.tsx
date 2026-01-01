import { Link } from "wouter";
import { motion } from "framer-motion";
import { Shield, Award, Users, ChevronRight, CheckCircle, Sparkles } from "lucide-react";
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
import { useEffect, useState } from "react";

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

  // Generate random stars
  const [stars, setStars] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([]);

  useEffect(() => {
    // Generate 20-30 tiny stars for the right side
    const newStars = Array.from({ length: 25 + Math.floor(Math.random() * 10) }, (_, i) => ({
      id: i,
      x: 60 + Math.random() * 40, // Position on right side (60-100% width)
      y: Math.random() * 100, // Random vertical position
      size: 1 + Math.random() * 2, // Tiny sizes (1-3px)
      delay: Math.random() * 3, // Random animation delay
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="min-h-screen">
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[100vh] md:min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-gray-900">
        
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }} />
        </div>

        {/* Globe Background - Enhanced for all screens */}
        <div className="absolute inset-0 w-full h-full z-0">
          <GlobeHero orbitText="SBM" isRotationEnabled />
        </div>

        {/* ===== ANIMATED SPARKLING STARS ===== */}
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute z-5"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.2, 0.8],
            }}
            transition={{
              duration: 2,
              delay: star.delay,
              repeat: Infinity,
              repeatDelay: Math.random() * 3 + 1,
              ease: "easeInOut",
            }}
          >
            <div className="w-full h-full rounded-full bg-gradient-to-r from-cyan-300 via-white to-blue-300 shadow-[0_0_4px_1px_rgba(186,230,253,0.5)]" />
          </motion.div>
        ))}

        {/* ===== GLOWING ORBS ===== */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-4 h-4 rounded-full z-5"
          animate={{
            boxShadow: [
              '0 0 8px 2px rgba(103, 232, 249, 0.3)',
              '0 0 16px 4px rgba(103, 232, 249, 0.6)',
              '0 0 8px 2px rgba(103, 232, 249, 0.3)',
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-full h-full rounded-full bg-cyan-400/50" />
        </motion.div>

        <motion.div
          className="absolute bottom-1/3 right-1/3 w-3 h-3 rounded-full z-5"
          animate={{
            boxShadow: [
              '0 0 6px 1px rgba(59, 130, 246, 0.3)',
              '0 0 12px 3px rgba(59, 130, 246, 0.6)',
              '0 0 6px 1px rgba(59, 130, 246, 0.3)',
            ],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        >
          <div className="w-full h-full rounded-full bg-blue-400/50" />
        </motion.div>

        {/* ===== FLOATING SPARKLES ICONS ===== */}
        <motion.div
          className="absolute top-1/3 right-1/5 z-5 text-cyan-300/60"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Sparkles size={16} />
        </motion.div>

        <motion.div
          className="absolute bottom-1/4 right-1/6 z-5 text-blue-300/60"
          animate={{
            y: [0, 10, 0],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
            delay: 1,
          }}
        >
          <Sparkles size={12} />
        </motion.div>

        {/* Darker overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent pointer-events-none z-10" />

        {/* Content Container */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            
            {/* -------- LEFT: TEXT CONTENT -------- */}
            <motion.div {...fadeInUp} className="max-w-xl space-y-6 md:space-y-8 text-white">
              
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/50 border border-blue-700/50 backdrop-blur-sm"
              >
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-sm font-medium text-cyan-100">
                  Trusted Service
                </span>
                <ChevronRight className="h-3 w-3 text-cyan-300" />
              </motion.div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="block mb-2 text-white">Elevating</span>
                <span className="block mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Industry Standards
                </span>
                <span className="block text-xl sm:text-2xl md:text-3xl font-normal text-blue-100 mt-4">
                  Through Expert Compliance & Audit Solutions
                </span>
              </h1>

              {/* Description */}
              <p className="text-lg sm:text-xl text-blue-100 leading-relaxed">
                Compliance for   certification audits through accredited certification bodies such as <span className="text-cyan-300 font-semibold"> BSI, DQS, DNV, SGS, and Intertek (PACD) </span>
              </p>

              {/* Key Points */}
              <div className="space-y-3 pt-2">
                {[
                  "Environment Audits for EAC Compliance Experts",
                  "25+ Years of Industry Experience",
                  "87+ Companies Successfully Served"
                ].map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="h-5 w-5 text-cyan-400 flex-shrink-0" />
                    <span className="text-blue-100">{point}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-6">
                <Link href="/services">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 group"
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Explore Our Services
                    <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="w-full sm:w-auto border-cyan-400/50 bg-transparent text-cyan-100 hover:bg-cyan-400/10 hover:border-cyan-300 px-8 transition-all backdrop-blur-sm"
                  >
                    Schedule Consultation
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="grid grid-cols-3 gap-4 pt-8 border-t border-blue-800/50"
              >
                <div className="text-center p-4 rounded-xl bg-blue-900/30 backdrop-blur-sm border border-blue-700/30">
                  <div className="text-3xl sm:text-4xl font-bold text-cyan-300">
                    87+
                  </div>
                  <div className="text-blue-100 text-sm mt-1 font-medium">
                    Companies Served
                  </div>
                </div>
                <div className="text-center p-4 rounded-xl bg-blue-900/30 backdrop-blur-sm border border-blue-700/30">
                  <div className="text-3xl sm:text-4xl font-bold text-cyan-300">
                    70
                  </div>
                  <div className="text-blue-100 text-sm mt-1 font-medium">
                    Ongoing Projects
                  </div>
                </div>
                <div className="text-center p-4 rounded-xl bg-blue-900/30 backdrop-blur-sm border border-blue-700/30">
                  <div className="text-3xl sm:text-4xl font-bold text-cyan-300">
                    25+
                  </div>
                  <div className="text-blue-100 text-sm mt-1 font-medium">
                    Years Experience
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* -------- RIGHT: SPACE FOR GLOBE (Only on larger screens) -------- */}
            <div className="hidden lg:block h-full" />
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          {/* <div className="flex flex-col items-center">
            <span className="text-sm text-blue-200 mb-2">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-blue-400/50 rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-3 bg-cyan-400 rounded-full mt-2"
              />
            </div>
          </div> */}
        </motion.div>

        {/* Bottom Gradient Transition */}
        <div className="absolute bottom-0 left-0 w-full pointer-events-none z-10">
          <svg className="w-full h-24" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C300,80 600,80 900,40 L900,120 L0,120 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ================= ABOUT SECTION ================= */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              About SBM Services
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full mb-4 md:mb-6" />
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
              Founded by Mr. Shivakumar, MBA, MLM, SBM Services delivers practical
              GAP audits, compliance assessments, and consultancy aligned with
              Supreme Court, EAC, ISO, and statutory requirements across South
              India.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={service.href}>
                  <Card className="h-full cursor-pointer group border-2 border-blue-100 hover:border-blue-300 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-blue-50/30">
                    <CardHeader>
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform shadow-md">
                        <service.icon className="h-6 w-6 sm:h-7 sm:w-7 text-blue-600" />
                      </div>
                      <CardTitle className="text-lg sm:text-xl text-gray-900 group-hover:text-blue-600 transition-colors">
                        {service.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm sm:text-base text-gray-600">
                        {service.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Audit Gallery */}
      <AuditGallery />
    </div>
  );
}