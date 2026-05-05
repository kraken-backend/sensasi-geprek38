// Path: src/components/ui/ScrollToTop.tsx
'use client';

import { ArrowUp } from 'lucide-react';

/**
 * Scroll to top button component (client side).
 * @returns JSX.Element
 */
export default function ScrollToTop() {
  const handleScroll = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <button
      onClick={handleScroll}
      className="mt-6 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#CC1414] transition-colors"
      aria-label="Kembali ke atas"
    >
      <ArrowUp className="h-4 w-4" /> Kembali ke atas
    </button>
  );
}
