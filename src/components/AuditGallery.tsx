import { motion } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  // {
  //   src: "/images/1.jpeg",
  //   title: "Empanelment of a nationalised bank",
  //   location: "Tamil Nadu",
  // },
  // {
  //   src: "/images/2.png",
  //   title: "Worker Safety & Statutory Compliance Training",
  //   location: "Vaniyambadi, Tamil Nadu",
  // },
  // {
  //   src: "/images/3.jpeg",
  //   title: "Internal GAP Audit & Documentation Review",
  //   location: "Leather Industry Unit",
  // },
  //  {
  //   src: "/images/4.png",
  //   title: "On-site Compliance Awareness Session",
  //   location: "Manufacturing Facility – Tamil Nadu",
  // },
  // {
  //   src: "/images/5.jpeg",
  //   title: "EHS & Statutory Awareness Program",
  //   location: "Industrial Unit – Tamil Nadu",
  // },
  // {
  //   src: "/images/6.jpeg",
  //   title: "Worker Safety & Statutory Compliance Training",
  //   location: "Vaniyambadi, Tamil Nadu",
  // },
  {
    src:"/images/7.jpeg",
    title:"Thiru Zafrula, Managing Director, Ranitec PVT LTD & President South Indian Tanners Association",
    location:"( SBM Team has Successfully completed  GAP Audit for  72 companies as per EAC Requirement )"
    
  }
];

export default function AuditGallery() {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const total = images.length;

  const next = () => setIndex((prev) => (prev + 1) % total);
  const prev = () => setIndex((prev) => (prev - 1 + total) % total);

  // Auto-slide (slow & calm)
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <section className="relative py-20 bg-muted/40 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.05),transparent_70%)]" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0icmdiYSgwLDAsMCwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9nPjwvc3ZnPg==')] opacity-30" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Audit & Awareness Programs
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              On-site GAP compliance audits and statutory awareness programs
              conducted across Tanneries and Manufacturing Units.
            </p>
          </motion.div>

          {/* Carousel */}
          <div className="relative">
            {/* Image */}
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="cursor-pointer"
              onClick={() => setOpen(true)}
            >
             <div className="flex items-center justify-center bg-muted rounded-xl h-[420px]">
  <img
    src={images[index].src}
    alt={images[index].title}
    className="max-h-full max-w-full object-contain"
    loading="lazy"
  />
</div>


              <div className="mt-4 text-center">
                <h3 className="font-semibold text-lg">
                  {images[index].title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {images[index].location}
                </p>
              </div>
            </motion.div>

            {/* Navigation */}
            <button
              onClick={prev}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur border rounded-full p-2 shadow hover:bg-background"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              onClick={next}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur border rounded-full p-2 shadow hover:bg-background"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-2 w-2 rounded-full transition-all ${
                    i === index ? "bg-accent w-5" : "bg-muted-foreground/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-5xl p-0 overflow-hidden">
          <img
            src={images[index].src}
            alt={images[index].title}
            className="w-full h-auto object-contain"
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
  