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
 * Responsive navbar with scroll-aware transparent to dark effect.
 * @returns JSX.Element
 */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  /**
   * Handles scroll event to toggle transparent vs dark background.
   */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY >= 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * Closes mobile menu when route changes.
   */
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0f0f0f]/95 backdrop-blur-md border-b border-white/10'
          : 'bg-transparent'
      }`}
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
              style={{ filter: isScrolled ? 'none' : 'brightness(0) invert(1)' }}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`font-medium text-sm tracking-wide transition-colors hover:text-[#CC1414] ${
                  pathname === link.href
                    ? 'text-[#CC1414]'
                    : 'text-white'
                }`}
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
        className={`md:hidden bg-[#0f0f0f]/95 backdrop-blur-md border-t border-white/10 transition-all duration-300 origin-top overflow-hidden ${
          isOpen ? 'max-h-64' : 'max-h-0'
        }`}
      >
        <nav className="flex flex-col px-4 py-2">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`py-3 px-2 text-base font-medium border-b border-white/10 last:border-0 transition-colors ${
                pathname === link.href ? 'text-[#CC1414]' : 'text-white hover:text-[#CC1414]'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
