import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

const images = [
 
  {
    src: "/images/2.png",
    title: "Worker Safety & Statutory Compliance Training",
    location: "Vaniyambadi, Tamil Nadu",
  },
  {
    src: "/images/3.jpeg",
    title: "Internal GAP Audit & Documentation Review",
    location: "Leather Industry Unit",
  },
  {
    src: "/images/4.png",
    title: "On-site Compliance Awareness Session",
    location: "Manufacturing Facility – Tamil Nadu",
  },
  {
    src: "/images/5.jpeg",
    title: "EHS & Statutory Awareness Program",
    location: "Industrial Unit – Tamil Nadu",
  },
  {
    src: "/images/6.jpeg",
    title: "Worker Safety & Statutory Compliance Training",
    location: "Vaniyambadi, Tamil Nadu",
  },
  {
    src: "/images/7.jpeg",
    title:
      "Thiru Zafrula, Managing Director, Ranitec PVT LTD & President South Indian Tanners Association"
    ,
    location:'SBM Team Successfully completed 72 companies for GAP Audit EAC Requirement'
  },
];

export default function AuditGallery() {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState(0);
  const total = images.length;

  const next = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % total);
  };
  
  const prev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + total) % total);
  };

  const goToSlide = (i) => {
    setDirection(i > index ? 1 : -1);
    setIndex(i);
  };

  // Auto-slide with pause on hover
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [isHovered, index]);

  const slideVariants = {
    enter: (direction:any) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction:any) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <>
      {/* Background */}
      <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        {/* Content Container */}
        <div className="relative max-w-7xl mx-auto">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-12 lg:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3 sm:mb-4 lg:mb-6 px-4">
              Our Audit & Awareness Programs
            </h2>
            <p className="text-slate-400 text-sm sm:text-base lg:text-lg xl:text-xl max-w-3xl mx-auto px-4">
              On-site GAP compliance audits and statutory awareness programs
              conducted across Tanneries and Manufacturing Units.
            </p>
          </motion.div>

          {/* Carousel */}
          <div
            className="relative max-w-6xl mx-auto"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Main Content Card */}
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl lg:rounded-3xl overflow-hidden border border-slate-800/50 shadow-2xl">
              <div className="grid lg:grid-cols-5 gap-0">
                {/* Image Section */}
                <div className="lg:col-span-3 relative aspect-[4/3] lg:aspect-auto lg:min-h-[500px] overflow-hidden">
                  <AnimatePresence initial={false} custom={direction}>
                    <motion.img
                      key={index}
                      src={images[index].src}
                      alt={images[index].title}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                      }}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </AnimatePresence>
                  
                  {/* Expand Icon */}
                  <button
                    onClick={() => setOpen(true)}
                    className="absolute top-4 right-4 bg-slate-950/60 backdrop-blur-md hover:bg-slate-950/80 text-white p-2.5 rounded-lg transition-all duration-300 hover:scale-110 z-10 group"
                    aria-label="View fullscreen"
                  >
                    <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-90 transition-transform duration-300" />
                  </button>
                </div>

                {/* Content Section */}
                <div className="lg:col-span-2 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                  <div className="flex-1 flex flex-col justify-center">
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      {/* Counter Badge */}
                      <div className="inline-flex items-center gap-2 mb-4 sm:mb-6">
                        <span className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full text-blue-300 text-xs sm:text-sm font-medium">
                          {index + 1} of {total}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4 leading-tight">
                        {images[index].title}
                      </h3>

                      {/* Location */}
                      {images[index].location && (
                        <p className="text-slate-400 text-sm sm:text-base lg:text-lg flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                          {images[index].location}
                        </p>
                      )}
                    </motion.div>
                  </div>

                  {/* Navigation Controls */}
                  <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
                    {/* Arrow Buttons */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={prev}
                        className="flex-1 bg-slate-800/50 hover:bg-slate-700/50 text-white py-3 px-4 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 border border-slate-700/50"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-5 h-5" />
                        <span className="text-sm font-medium hidden sm:inline">Previous</span>
                      </button>
                      <button
                        onClick={next}
                        className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 px-4 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
                        aria-label="Next image"
                      >
                        <span className="text-sm font-medium hidden sm:inline">Next</span>
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Dots Navigation */}
                    <div className="flex items-center justify-center gap-2 flex-wrap">
                      {images.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => goToSlide(i)}
                          className={`h-2 rounded-full transition-all duration-300 hover:scale-110 ${
                            i === index
                              ? "bg-gradient-to-r from-blue-400 to-purple-400 w-8"
                              : "bg-slate-600 hover:bg-slate-500 w-2"
                          }`}
                          aria-label={`Go to image ${i + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-7xl w-[95vw] h-[95vh] p-0 bg-slate-950/95 backdrop-blur-xl border-slate-800">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <AnimatePresence mode="wait">
              <motion.img
                key={index}
                src={images[index].src}
                alt={images[index].title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            </AnimatePresence>

            {/* Lightbox Navigation */}
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Lightbox Caption */}
            <div className="absolute bottom-4 left-4 right-4 bg-slate-950/90 backdrop-blur-md p-3 sm:p-4 rounded-lg max-h-[30vh] overflow-y-auto">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-1">
                    {images[index].title}
                  </h3>
                  {images[index].location && (
                    <p className="text-slate-300 text-xs sm:text-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                      {images[index].location}
                    </p>
                  )}
                </div>
                <span className="text-slate-400 text-xs whitespace-nowrap">
                  {index + 1} / {total}
                </span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}