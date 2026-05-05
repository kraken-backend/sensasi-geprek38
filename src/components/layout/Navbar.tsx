// Path: src/components/layout/Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

/**
 * Responsive navbar with mobile hamburger menu.
 * Sticky with backdrop blur on scroll.
 * @returns JSX.Element
 */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const links = [
    { name: 'Beranda', href: '/' },
    { name: 'Menu', href: '/menu' },
    { name: 'Tentang', href: '/about' },
    { name: 'Kontak', href: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-white py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="relative flex items-center h-10 w-40">
            <Image
              src="/web_logo.png"
              alt="Sensasi Geprek 38 Logo"
              fill
              className="object-contain object-left"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-[#CC1414] ${
                  pathname === link.href ? 'text-[#CC1414] underline underline-offset-4 decoration-2' : 'text-gray-700'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-gray-700 hover:text-[#CC1414] focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-lg transition-all duration-300 origin-top overflow-hidden ${
          isOpen ? 'max-h-64 border-t' : 'max-h-0'
        }`}
      >
        <nav className="flex flex-col px-4 py-2">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`py-3 px-2 text-base font-medium border-b border-gray-100 last:border-0 ${
                pathname === link.href ? 'text-[#CC1414]' : 'text-gray-700'
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
