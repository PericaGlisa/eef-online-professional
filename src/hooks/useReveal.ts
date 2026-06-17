import { useEffect } from "react";

export function useReveal(selector = ".reveal-on-scroll") {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target); // Animate once
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -50px 0px", // Trigger slightly before fully entering
      },
    );

    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [selector]);
}
