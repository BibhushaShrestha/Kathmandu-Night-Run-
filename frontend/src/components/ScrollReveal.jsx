import React, { useRef, useEffect, useState } from "react";

export default function ScrollReveal({
  children,
  variant = "fade-up", // 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in'
  delay = 0,
  duration = 800,
  threshold = 0.12,
  className = "",
  style = {},
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [threshold]);

  const getInitialTransform = () => {
    switch (variant) {
      case "fade-up":
        return "translate3d(0, 45px, 0) scale(1)";
      case "fade-down":
        return "translate3d(0, -45px, 0) scale(1)";
      case "fade-left":
        return "translate3d(-45px, 0, 0) scale(1)";
      case "fade-right":
        return "translate3d(45px, 0, 0) scale(1)";
      case "zoom-in":
        return "translate3d(0, 0, 0) scale(0.92)";
      default:
        return "translate3d(0, 45px, 0) scale(1)";
    }
  };

  const animationStyle = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translate3d(0, 0, 0) scale(1)" : getInitialTransform(),
    transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
    willChange: "opacity, transform",
    ...style,
  };

  return (
    <div ref={ref} style={animationStyle} className={className}>
      {children}
    </div>
  );
}
