// Path: src/components/layout/Footer.tsx
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Instagram, MessageCircle, Utensils } from 'lucide-react';
import { RESTAURANT } from '@/lib/constants';
import ScrollToTop from '@/components/ui/ScrollToTop';

/**
 * Main footer component (server side).
 * @returns JSX.Element
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t mt-auto">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <div className="relative h-12 w-48">
              <Image
                src="/web_logo.png"
                alt="Sensasi Geprek 38"
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              {RESTAURANT.tagline}
            </p>
          </div>

          {/* Links Col */}
          <div className="space-y-4">
            <h3 className="font-bold text-gray-900">Jelajahi</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/" className="hover:text-[#CC1414] transition-colors">Beranda</Link></li>
              <li><Link href="/menu" className="hover:text-[#CC1414] transition-colors">Menu Kami</Link></li>
              <li><Link href="/about" className="hover:text-[#CC1414] transition-colors">Tentang Kami</Link></li>
              <li><Link href="/contact" className="hover:text-[#CC1414] transition-colors">Kontak & Lokasi</Link></li>
            </ul>
          </div>

          {/* Social Col */}
          <div className="space-y-4">
            <h3 className="font-bold text-gray-900">Ikuti Kami</h3>
            <div className="flex flex-col space-y-3 text-sm text-gray-600">
              <a href={RESTAURANT.whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#25D366] transition-colors">
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
              <a href={RESTAURANT.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#E1306C] transition-colors">
                <Instagram className="h-4 w-4" /> Instagram
              </a>
              <a href={RESTAURANT.gofood} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#CC1414] transition-colors">
                <Utensils className="h-4 w-4" /> GoFood
              </a>
            </div>
          </div>

          {/* Address Col */}
          <div className="space-y-4">
            <h3 className="font-bold text-gray-900">Lokasi Kami</h3>
            <div className="flex items-start gap-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-[#CC1414]" />
              <p className="leading-relaxed">{RESTAURANT.address}</p>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <p>© {currentYear} {RESTAURANT.name}. All rights reserved.</p>
          <ScrollToTop />
        </div>
      </div>
    </footer>
  );
}
