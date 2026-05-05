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
 * Responsive floating pill-style navbar with proportional layout.
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
    <div
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-8"
      style={{ background: 'transparent', pointerEvents: 'none' }}
    >
      {/* Pill Container */}
      <nav
        className="relative flex items-center justify-between rounded-full px-4 py-2"
        style={{
          width: '80%',
          maxWidth: '1100px',
          background: 'rgba(180,0,0,0.85)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.2)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
          pointerEvents: 'auto',
        }}
      >
        {/* Logo Section */}
        <Link href="/" className="flex items-center">
          <Image
            src="/web_logo.png"
            alt="Sensasi Geprek 38 Logo"
            width={160}
            height={48}
            className="h-20 w-auto"
            priority
          />
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-white text-base font-medium transition-colors duration-200 hover:text-yellow-300 ${pathname === link.href ? 'text-yellow-300' : ''
                }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-1 text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Dropdown */}
      <div
        className="absolute top-full left-1/2 -translate-x-1/2 md:hidden transition-all duration-300 overflow-hidden text-center"
        style={{
          background: 'rgba(160,0,0,0.95)',
          backdropFilter: 'blur(12px)',
          borderRadius: '16px',
          marginTop: '8px',
          padding: '16px',
          minWidth: '200px',
          pointerEvents: 'auto',
          maxHeight: isOpen ? '16rem' : '0',
        }}
      >
        <div className="flex flex-col" style={{ gap: '12px' }}>
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-white font-medium transition-colors duration-200 hover:text-yellow-300 ${pathname === link.href ? 'text-yellow-300' : ''
                }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}