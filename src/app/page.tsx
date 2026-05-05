// Path: src/app/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Utensils, Flame, ShieldCheck, MapPin, ExternalLink, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import OpenStatus from '@/components/ui/OpenStatus';
import ScrollAnimation from '@/components/ui/ScrollAnimation';
import MenuCard from '@/components/ui/MenuCard';
import { RESTAURANT } from '@/lib/constants';
import fs from 'fs';
import path from 'path';
import { MenuData } from '@/types/menu';

/**
 * Home page for Sensasi Geprek 38.
 * @returns JSX.Element
 */
export default async function Home() {
  const menuFilePath = path.join(process.cwd(), 'src/data/menu.json');
  const menuFileContent = fs.readFileSync(menuFilePath, 'utf8');
  const menuData: MenuData = JSON.parse(menuFileContent);
  
  const previewItems = menuData.categories[0]?.items.slice(0, 3) || [];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Background Image */}
        <Image
          src="/menu/menu06.png"
          alt="Sensasi Mie Goreng Geprek"
          fill
          priority
          className="object-cover"
        />

        {/* Overlay */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.65) 100%)'
          }}
        />

        {/* Content */}
        <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4 text-center">
          <ScrollAnimation className="flex flex-col items-center space-y-6">
            <div className="relative w-48 md:w-64 aspect-[3/1]">
              <Image
                src="/header_logo.png"
                alt={RESTAURANT.name}
                fill
                priority
                className="object-contain"
              />
            </div>
            
            <h1 className="text-white font-bold text-3xl md:text-5xl mb-4">
              {RESTAURANT.tagline}
            </h1>
            
            <p className="text-white/90 text-base md:text-lg mb-6 max-w-2xl">
              Ayam geprek bumbu rempah warisan keluarga sejak 2019. Halal, pedas bisa diatur.
            </p>

            <div className="text-white">
              <OpenStatus />
            </div>

            <div className="flex gap-4 mt-6">
              <Button className="bg-[#CC1414] text-white rounded-full px-8 py-3 hover:bg-[#A50000] transition" asChild>
                <a href={RESTAURANT.gofood} target="_blank" rel="noopener noreferrer">
                  Pesan via GoFood
                </a>
              </Button>
              <Button variant="outline" className="border-2 border-white text-white rounded-full px-8 py-3 hover:bg-white hover:text-gray-900 transition" asChild>
                <a href={RESTAURANT.whatsappLink} target="_blank" rel="noopener noreferrer">
                  Hubungi Kami
                </a>
              </Button>
            </div>
          </ScrollAnimation>
        </div>

        {/* Scroll Down Arrow */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce text-white">
          <ChevronDown className="h-8 w-8" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <ScrollAnimation>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900">Kenapa Sensasi Geprek 38?</h2>
              <div className="w-24 h-1 bg-[#CC1414] mx-auto mt-4 rounded-full"></div>
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollAnimation delay={100}>
              <div className="bg-[#F5F0E8]/50 rounded-2xl p-8 text-center h-full hover:shadow-lg transition-shadow duration-300">
                <div className="w-16 h-16 bg-[#CC1414]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#CC1414]">
                  <Utensils className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Bumbu Rempah Asli</h3>
                <p className="text-gray-600 leading-relaxed">Diramu dengan resep warisan keluarga, bumbu rempah khas meresap hingga ke dalam adonan tepung.</p>
              </div>
            </ScrollAnimation>
            
            <ScrollAnimation delay={200}>
              <div className="bg-[#F5F0E8]/50 rounded-2xl p-8 text-center h-full hover:shadow-lg transition-shadow duration-300">
                <div className="w-16 h-16 bg-[#E06800]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#E06800]">
                  <Flame className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Pedas Bisa Diatur</h3>
                <p className="text-gray-600 leading-relaxed">Nikmati ayam geprek dengan tingkat kepedasan yang bisa disesuaikan dengan selera Anda.</p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation delay={300}>
              <div className="bg-[#F5F0E8]/50 rounded-2xl p-8 text-center h-full hover:shadow-lg transition-shadow duration-300">
                <div className="w-16 h-16 bg-[#25D366]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#25D366]">
                  <ShieldCheck className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Halal & Higienis</h3>
                <p className="text-gray-600 leading-relaxed">Kualitas adalah prioritas utama kami. Disajikan dengan bersih dan 100% Halal.</p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Menu Preview Section */}
      <section className="py-20 bg-[#F5F0E8]/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <ScrollAnimation>
              <h2 className="text-3xl font-bold text-gray-900">Menu Andalan</h2>
              <div className="w-24 h-1 bg-[#CC1414] mt-4 rounded-full"></div>
            </ScrollAnimation>
            <ScrollAnimation delay={200} className="mt-6 md:mt-0">
              <Button variant="ghost" className="text-[#CC1414] hover:text-[#A50000] hover:bg-[#CC1414]/10 group" asChild>
                <Link href="/menu">
                  Lihat Semua Menu <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </ScrollAnimation>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {previewItems.map((item, index) => (
              <ScrollAnimation key={item.id} delay={index * 100}>
                <MenuCard item={item} />
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* About Teaser */}
      <section className="py-20 bg-white overflow-hidden relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <ScrollAnimation className="w-full lg:w-1/2" delay={100}>
              <div className="relative aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-[#CC1414] rounded-full translate-x-4 translate-y-4 opacity-10"></div>
                <Image
                  src="/kiky.png"
                  alt="Yuki Hendrawan Arfianto"
                  fill
                  className="object-cover rounded-full shadow-xl relative z-10"
                />
              </div>
            </ScrollAnimation>
            
            <ScrollAnimation className="w-full lg:w-1/2 space-y-6" delay={200}>
              <h2 className="text-3xl font-bold text-gray-900">Dari Dapur Keluarga, Untuk Semua</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Sensasi Geprek 38 lahir dari sebuah keberanian pada 23 Oktober 2019. Kami membawa senjata rahasia — racikan bumbu rempah turun-temurun yang dipadukan ke dalam standar pembuatan ayam geprek, sehingga setiap gigitan terasa nendang dari dalam.
              </p>
              <Button variant="outline" className="rounded-full border-gray-300 hover:bg-gray-50 h-12 px-8" asChild>
                <Link href="/about">Selengkapnya tentang kami</Link>
              </Button>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* CTA / Location Section */}
      <section className="py-20 bg-[#CC1414] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/menu/placeholder.jpg')] opacity-10 bg-cover bg-center mix-blend-multiply"></div>
        <div className="container mx-auto px-4 relative z-10">
          <ScrollAnimation className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Lapar? Pesan Sekarang!</h2>
            
            <div className="flex items-center justify-center gap-2 text-lg md:text-xl font-medium mb-8">
              <MapPin className="h-6 w-6" />
              <p>{RESTAURANT.address}</p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="rounded-full bg-white text-[#CC1414] hover:bg-gray-100 h-14 px-8 text-lg font-bold shadow-lg" asChild>
                <a href={RESTAURANT.maps} target="_blank" rel="noopener noreferrer">
                  Buka di Maps
                </a>
              </Button>
              <Button size="lg" className="rounded-full bg-[#E06800] text-white hover:bg-[#E06800]/90 h-14 px-8 text-lg font-bold shadow-lg" asChild>
                <a href={RESTAURANT.gofood} target="_blank" rel="noopener noreferrer">
                  Pesan GoFood
                </a>
              </Button>
            </div>

            <div className="pt-12">
              <a href={RESTAURANT.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center hover:text-gray-200 transition-colors font-medium">
                <ExternalLink className="mr-2 h-5 w-5" /> Ikuti kami {RESTAURANT.instagramHandle}
              </a>
            </div>
          </ScrollAnimation>
        </div>
      </section>
    </div>
  );
}
