// Path: src/app/about/page.tsx
import { Metadata } from 'next';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';
import { RESTAURANT } from '@/lib/constants';
import ScrollAnimation from '@/components/ui/ScrollAnimation';

export const metadata: Metadata = {
  title: 'Tentang Kami',
  description: 'Kenali cerita di balik Sensasi Geprek 38. Dibangun oleh Yuki Hendrawan Arfianto sejak 23 Oktober 2019 dengan bumbu rempah warisan keluarga Imam Tri Purnomo.',
};

/**
 * Parses markdown content splitting by ## headings.
 * @param markdown 
 * @returns Array of sections
 */
function parseMarkdown(markdown: string) {
  const sections = markdown.split('## ').filter(Boolean);
  return sections.map((section) => {
    const lines = section.split('\n');
    const title = lines[0].trim();
    const content = lines.slice(1).join('\n').trim();
    return { title, content };
  });
}

/**
 * About page displaying story from markdown and timeline.
 * @returns JSX.Element
 */
export default function AboutPage() {
  const aboutFilePath = path.join(process.cwd(), 'content/about.md');
  const aboutFileContent = fs.readFileSync(aboutFilePath, 'utf8');
  
  // Remove main heading # About...
  const markdownWithoutMainHeading = aboutFileContent.replace(/^# .*?\n/, '');
  const sections = parseMarkdown(markdownWithoutMainHeading);

  return (
    <div className="flex flex-col min-h-screen bg-white pb-20">
      {/* Page Hero */}
      <section className="bg-[#CC1414] text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/header_logo.png')] opacity-5 bg-contain bg-center bg-no-repeat bg-fixed mix-blend-overlay"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <ScrollAnimation>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{RESTAURANT.name}</h1>
            <p className="text-xl md:text-2xl font-light text-white/90">Sejak {RESTAURANT.founded}</p>
          </ScrollAnimation>
        </div>
      </section>

      {/* Owner & Story Section */}
      <section className="container mx-auto px-4 py-16 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Owner Card Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <ScrollAnimation>
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 text-center sticky top-24">
                <div className="relative w-48 h-48 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full border-4 border-[#CC1414] -translate-x-2 -translate-y-2 opacity-20"></div>
                  <Image
                    src="/kiky.png"
                    alt={RESTAURANT.owner}
                    fill
                    className="object-cover rounded-full relative z-10 shadow-md"
                  />
                </div>
                <h2 className="text-xl font-bold text-gray-900">{RESTAURANT.owner}</h2>
                <p className="text-[#CC1414] font-medium mt-1">{RESTAURANT.ownerTitle}</p>
              </div>
            </ScrollAnimation>
          </div>

          {/* Story Content */}
          <div className="lg:col-span-8 space-y-12">
            {sections.map((section, index) => {
              if (section.title === 'Informasi') return null; // Skip information section from MD as we use constants
              
              return (
                <ScrollAnimation key={index} delay={index * 100}>
                  <div className="prose prose-lg max-w-none prose-headings:text-[#CC1414] prose-p:text-gray-600 prose-p:leading-relaxed">
                    <h2 className="text-3xl font-bold border-b pb-4 mb-6">{section.title}</h2>
                    {section.content.split('\n\n').map((paragraph, pIndex) => (
                      <p key={pIndex}>{paragraph}</p>
                    ))}
                  </div>
                </ScrollAnimation>
              );
            })}
          </div>

        </div>
      </section>

      {/* Values & Timeline */}
      <section className="bg-[#F5F0E8]/50 py-20 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            
            {/* Timeline */}
            <ScrollAnimation>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Perjalanan Kami</h2>
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[#CC1414] before:to-transparent">
                
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-[#CC1414] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2"></div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded shadow-sm bg-white border border-gray-100">
                    <div className="text-sm font-bold text-[#CC1414] mb-1">23 Oktober 2019</div>
                    <p className="text-gray-600 text-sm">Sensasi Geprek 38 berdiri pertama kali.</p>
                  </div>
                </div>

                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-[#CC1414] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2"></div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded shadow-sm bg-white border border-gray-100">
                    <div className="text-sm font-bold text-[#CC1414] mb-1">2020</div>
                    <p className="text-gray-600 text-sm">Mulai dikenal luas di media sosial.</p>
                  </div>
                </div>

                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-[#CC1414] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2"></div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded shadow-sm bg-white border border-gray-100">
                    <div className="text-sm font-bold text-[#CC1414] mb-1">2021</div>
                    <p className="text-gray-600 text-sm">Bergabung dengan platform GoFood.</p>
                  </div>
                </div>

                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-[#CC1414] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2"></div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded shadow-sm bg-white border border-gray-100">
                    <div className="text-sm font-bold text-[#CC1414] mb-1">Sekarang</div>
                    <p className="text-gray-600 text-sm">Melayani pelanggan setia Semarang dan terus berinovasi.</p>
                  </div>
                </div>

              </div>
            </ScrollAnimation>

            {/* Values */}
            <ScrollAnimation delay={200}>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Nilai Kami</h2>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex gap-4 items-start">
                  <div className="w-12 h-12 bg-[#CC1414]/10 rounded-full flex items-center justify-center text-[#CC1414] font-bold text-xl shrink-0">1</div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Kualitas Nomor 1</h3>
                    <p className="text-gray-600">Bahan baku pilihan dan higienis menjadi standar mutlak di dapur kami.</p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex gap-4 items-start">
                  <div className="w-12 h-12 bg-[#E06800]/10 rounded-full flex items-center justify-center text-[#E06800] font-bold text-xl shrink-0">2</div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Bumbu Original</h3>
                    <p className="text-gray-600">Resep warisan keluarga yang tidak bisa ditemukan di tempat lain.</p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex gap-4 items-start">
                  <div className="w-12 h-12 bg-[#25D366]/10 rounded-full flex items-center justify-center text-[#25D366] font-bold text-xl shrink-0">3</div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Kepuasan Pelanggan</h3>
                    <p className="text-gray-600">Tingkat kepedasan yang bisa diatur untuk memastikan pengalaman makan terbaik.</p>
                  </div>
                </div>
              </div>
            </ScrollAnimation>

          </div>
        </div>
      </section>

    </div>
  );
}
