import { useEffect } from "react";
import { useLocation } from "wouter";

export function useScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    // Smooth scroll back to top every time the route changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);
}
