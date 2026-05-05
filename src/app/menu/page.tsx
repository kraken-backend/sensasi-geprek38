// Path: src/app/menu/page.tsx
import { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import { MenuData } from '@/types/menu';
import MenuCard from '@/components/ui/MenuCard';
import ScrollAnimation from '@/components/ui/ScrollAnimation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const metadata: Metadata = {
  title: 'Menu Ayam Geprek',
  description: 'Lihat menu lengkap Sensasi Geprek 38. Ayam geprek dengan berbagai level pedas dan bumbu rempah khas. Pesan via GoFood sekarang!',
};

/**
 * Menu page displaying all categories and items.
 * @returns JSX.Element
 */
export default function MenuPage() {
  const menuFilePath = path.join(process.cwd(), 'src/data/menu.json');
  const menuFileContent = fs.readFileSync(menuFilePath, 'utf8');
  const menuData: MenuData = JSON.parse(menuFileContent);

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F0E8]/20 pb-20">
      {/* Page Hero */}
      <section className="bg-white border-b py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <ScrollAnimation>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Menu Kami</h1>
            <div className="w-24 h-1 bg-[#CC1414] mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Pilih menu favoritmu! Ayam geprek bumbu rempah dengan tingkat kepedasan yang bisa disesuaikan.
            </p>
          </ScrollAnimation>
        </div>
      </section>

      {/* Menu Content */}
      <section className="container mx-auto px-4 py-12">
        {menuData.categories.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">Menu sedang diperbarui. Silakan kembali lagi nanti.</p>
          </div>
        ) : (
          <Tabs defaultValue={menuData.categories[0].id} className="w-full">
            <div className="sticky top-[72px] z-30 bg-[#F5F0E8]/90 backdrop-blur-md pt-4 pb-4 mb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
              <TabsList className="w-full justify-start h-auto flex-wrap bg-transparent gap-2">
                {menuData.categories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="rounded-full px-6 py-3 data-[state=active]:bg-[#CC1414] data-[state=active]:text-white bg-white shadow-sm"
                  >
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {menuData.categories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-0 outline-none">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {category.items.map((item, index) => (
                    <ScrollAnimation key={item.id} delay={index * 50}>
                      <MenuCard item={item} />
                    </ScrollAnimation>
                  ))}
                </div>
                {category.items.length === 0 && (
                  <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <p className="text-gray-500">Belum ada item di kategori ini.</p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        )}
      </section>
    </div>
  );
}
