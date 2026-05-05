// Path: src/app/contact/page.tsx
'use client';

import { useState } from 'react';
import { MapPin, MessageCircle, ExternalLink, Utensils, Clock, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import OpenStatus from '@/components/ui/OpenStatus';
import ScrollAnimation from '@/components/ui/ScrollAnimation';
import { RESTAURANT, HOURS } from '@/lib/constants';

/**
 * Contact page with interactive elements like copying address and Google Maps.
 * @returns JSX.Element
 */
export default function ContactPage() {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(RESTAURANT.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Get current day to highlight in schedule
  const nowWIB = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
  const currentDayIndex = new Date(nowWIB).getDay();
  const daysIndo = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const currentDay = daysIndo[currentDayIndex];

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F0E8]/20 pb-20">
      {/* Page Hero */}
      <section className="bg-white border-b py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <ScrollAnimation>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Kontak & Lokasi</h1>
            <div className="w-24 h-1 bg-[#CC1414] mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Kami selalu senang menyambut Anda. Hubungi kami atau kunjungi outlet Sensasi Geprek 38.
            </p>
          </ScrollAnimation>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Info & Schedule */}
          <div className="space-y-10">
            <ScrollAnimation>
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="mb-6">
                  <OpenStatus />
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Hubungi Kami</h2>
                <div className="space-y-6">
                  <Button 
                    className="w-full h-16 text-lg rounded-xl bg-[#25D366] hover:bg-[#25D366]/90 text-white flex items-center gap-3 shadow-md hover:shadow-lg transition-all"
                    asChild
                  >
                    <a href={RESTAURANT.whatsappLink} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="h-6 w-6" />
                      Chat WhatsApp ({RESTAURANT.whatsapp})
                    </a>
                  </Button>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button variant="outline" className="flex-1 h-14 rounded-xl border-gray-300 hover:bg-pink-50 hover:text-[#E1306C] hover:border-[#E1306C]" asChild>
                      <a href={RESTAURANT.instagram} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-5 w-5" /> Instagram
                      </a>
                    </Button>
                    <Button variant="outline" className="flex-1 h-14 rounded-xl border-gray-300 hover:bg-red-50 hover:text-[#CC1414] hover:border-[#CC1414]" asChild>
                      <a href={RESTAURANT.gofood} target="_blank" rel="noopener noreferrer">
                        <Utensils className="mr-2 h-5 w-5" /> GoFood
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation delay={100}>
              <Card className="p-6 md:p-8 rounded-2xl shadow-sm border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-[#E06800]/10 rounded-full text-[#E06800]">
                    <Clock className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Jam Operasional</h2>
                </div>
                
                <div className="space-y-3">
                  {HOURS.schedule.map((schedule) => (
                    <div 
                      key={schedule.day} 
                      className={`flex justify-between items-center p-3 rounded-lg transition-colors ${
                        currentDay === schedule.day 
                          ? 'bg-[#CC1414]/10 text-[#CC1414] font-semibold border border-[#CC1414]/20' 
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <span>{schedule.day}</span>
                      <span>
                        {schedule.isOpen ? `${schedule.open} - ${schedule.close} WIB` : 'Tutup'}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </ScrollAnimation>
          </div>

          {/* Maps & Address */}
          <div className="space-y-8">
            <ScrollAnimation delay={200} className="h-full">
              <Card className="p-6 md:p-8 rounded-2xl shadow-sm border-gray-100 h-full flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-[#CC1414]/10 rounded-full text-[#CC1414]">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Lokasi</h2>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full"
                    onClick={handleCopyAddress}
                  >
                    {copied ? <Check className="h-4 w-4 mr-2 text-green-500" /> : <Copy className="h-4 w-4 mr-2" />}
                    {copied ? 'Tersalin' : 'Salin Alamat'}
                  </Button>
                </div>
                
                <p className="text-gray-600 text-lg leading-relaxed mb-8 font-medium bg-gray-50 p-4 rounded-xl border border-gray-100">
                  {RESTAURANT.address}
                </p>
                
                <div className="flex-1 min-h-[400px] w-full rounded-xl overflow-hidden shadow-inner border border-gray-200">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.9575038167694!2d110.45781447475825!3d-7.01423456883256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708c5c7de9ab23%3A0xc07ce61b24479e0a!2sAyam%20Geprek%20Sensasi%20Geprek%2038%20Gemah!5e0!3m2!1sid!2sid!4v1715012345678!5m2!1sid!2sid" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Maps Lokasi Sensasi Geprek 38"
                    className="w-full h-full"
                  ></iframe>
                </div>
                
                <div className="mt-6 text-center">
                   <Button className="rounded-full bg-[#CC1414] hover:bg-[#A50000] text-white" asChild>
                    <a href={RESTAURANT.maps} target="_blank" rel="noopener noreferrer">
                      Buka di Google Maps
                    </a>
                  </Button>
                </div>
              </Card>
            </ScrollAnimation>
          </div>

        </div>
      </section>
    </div>
  );
}
