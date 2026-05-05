// Path: src/components/layout/Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const links = [
  { name: 'Beranda', href: '/' },
  { name: 'Menu', href: '/menu' },
  { name: 'Tentang', href: '/about' },
  { name: 'Kontak', href: '/contact' },
];

/**
 * Responsive navbar with dark transparent background.
 * @returns JSX.Element
 */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  /**
   * Closes mobile menu when route changes.
   */
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: 'rgba(180,0,0,0.82)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.15)',
      }}
    >
      <div className="container mx-auto px-4 md:px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/web_logo.png"
              alt="Sensasi Geprek 38 Logo"
              width={160}
              height={48}
              className="h-10 md:h-12 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="font-medium text-sm tracking-wide text-white transition-colors duration-200 hover:text-yellow-300"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className="md:hidden transition-all duration-300 origin-top overflow-hidden"
        style={{
          background: 'rgba(160,0,0,0.95)',
          backdropFilter: 'blur(12px)',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          maxHeight: isOpen ? '16rem' : '0',
        }}
      >
        <nav className="flex flex-col px-4 py-2">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="py-3 px-2 text-base font-medium text-white transition-colors duration-200 hover:text-yellow-300 border-b border-white/10 last:border-0"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
