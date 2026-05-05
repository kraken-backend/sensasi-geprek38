// Path: src/components/layout/Footer.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Instagram, MessageCircle, Utensils } from 'lucide-react';
import { RESTAURANT } from '@/lib/constants';

/**
 * Main footer component with dark premium style.
 * @returns JSX.Element
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  /**
   * Scrolls window to top with smooth behavior.
   */
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0f0f0f] text-white border-t-2 border-[#CC1414]">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          
          {/* Column 1 — Brand */}
          <div className="space-y-4">
            <div className="relative h-12 w-48">
              <Image
                src="/web_logo.png"
                alt={RESTAURANT.name}
                fill
                className="object-contain object-left brightness-0 invert"
              />
            </div>
            <p className="text-gray-400 text-sm mt-2 max-w-xs">
              {RESTAURANT.tagline}
            </p>
          </div>

          {/* Column 2 — Jelajahi */}
          <div className="space-y-4">
            <h3 className="font-bold text-white">Jelajahi</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white transition text-sm">Beranda</Link></li>
              <li><Link href="/menu" className="text-gray-400 hover:text-white transition text-sm">Menu Kami</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white transition text-sm">Tentang Kami</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition text-sm">Kontak & Lokasi</Link></li>
            </ul>
          </div>

          {/* Column 3 — Ikuti Kami */}
          <div className="space-y-4">
            <h3 className="font-bold text-white">Ikuti Kami</h3>
            <div className="flex flex-col space-y-3">
              <a href={RESTAURANT.whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition">
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
              <a href={RESTAURANT.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition">
                <Instagram className="h-4 w-4" /> Instagram
              </a>
              <a href={RESTAURANT.gofood} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition">
                <Utensils className="h-4 w-4" /> GoFood
              </a>
            </div>
          </div>

          {/* Column 4 — Lokasi & Jam */}
          <div className="space-y-4">
            <h3 className="font-bold text-white">Lokasi & Jam</h3>
            <div className="flex items-start gap-2 text-gray-400 text-sm">
              <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <p className="leading-relaxed">{RESTAURANT.address}</p>
            </div>
            <p className="text-gray-400 text-sm">
              Buka: Sen-Kam & Sab 09.00-17.00 WIB
            </p>
            <p className="text-gray-500 text-xs">
              Jumat & Minggu Tutup
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-8 pt-6">
          <div className="flex justify-between items-center">
            <p className="text-gray-500 text-xs">
              © {currentYear} {RESTAURANT.name}. All rights reserved.
            </p>
            <button
              onClick={scrollToTop}
              className="text-gray-400 hover:text-white text-xs transition"
            >
              Kembali ke atas
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
