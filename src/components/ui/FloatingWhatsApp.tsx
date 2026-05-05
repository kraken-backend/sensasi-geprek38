// Path: src/components/ui/FloatingWhatsApp.tsx
'use client';

import { MessageCircle } from 'lucide-react';
import { RESTAURANT } from '@/lib/constants';

/**
 * Floating WhatsApp button fixed to bottom-right corner.
 * Visible on all pages with pulse animation.
 * @returns JSX.Element
 */
export default function FloatingWhatsApp() {
  return (
    <a
      href={RESTAURANT.whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-[#25D366]/50 group"
      aria-label="Chat with us on WhatsApp"
    >
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-75"></span>
      <MessageCircle className="relative z-10 h-7 w-7" />
      
      {/* Tooltip */}
      <span className="absolute right-full mr-4 hidden w-max rounded-lg bg-gray-900 px-3 py-2 text-sm text-white opacity-0 transition-opacity group-hover:block group-hover:opacity-100">
        Chat dengan kami!
        {/* Triangle pointer */}
        <span className="absolute -right-1 top-1/2 -mt-1 h-2 w-2 rotate-45 bg-gray-900"></span>
      </span>
    </a>
  );
}
