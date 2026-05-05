// Path: src/app/menu/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Menu Ayam Geprek',
  description: 'Lihat menu lengkap Sensasi Geprek 38. Ayam geprek dengan berbagai level pedas dan bumbu rempah khas. Pesan via GoFood sekarang!',
};

/**
 * Layout for menu pages.
 * @param props.children - Child components
 * @returns JSX.Element
 */
export default function MenuLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
