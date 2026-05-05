// Path: src/components/ui/ScrollAnimation.tsx
'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

interface ScrollAnimationProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/**
 * Wrapper that triggers fade+slide-up animation when element enters viewport.
 * Uses Intersection Observer API.
 * @param children - React nodes to animate
 * @param delay - Optional delay in milliseconds
 * @param className - Optional CSS classes
 * @returns JSX.Element
 */
export default function ScrollAnimation({ children, delay = 0, className = '' }: ScrollAnimationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Apply delay if specified
            if (delay > 0) {
              setTimeout(() => {
                setIsVisible(true);
              }, delay);
            } else {
              setIsVisible(true);
            }
            // Once visible, stop observing
            if (domRef.current) {
              observer.unobserve(domRef.current);
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [delay]);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  );
}
