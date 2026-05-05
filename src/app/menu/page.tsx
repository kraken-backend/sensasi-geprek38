// Path: src/app/menu/page.tsx
'use client';

import { useState } from 'react';
import menuDataRaw from '@/data/menu.json';
import MenuCard from '@/components/ui/MenuCard';
import { MenuData, MenuItem } from '@/types/menu';

const menuData: MenuData = menuDataRaw as MenuData;

/**
 * Flattens all menu items across categories.
 * @returns Array of all MenuItem objects
 */
function getAllItems(): MenuItem[] {
  return menuData.categories.flatMap((category) => category.items);
}

/**
 * Menu page displaying all categories and items with client-side filtering.
 * @returns JSX.Element
 */
export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('semua');

  const allItems = getAllItems();
  const filteredItems =
    selectedCategory === 'semua'
      ? allItems
      : menuData.categories
          .find((cat) => cat.id === selectedCategory)
          ?.items.filter((item) => item.available !== false) || [];

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F0E8]/20 pb-20">
      {/* Page Hero */}
      <section className="bg-white border-b py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Menu Kami</h1>
          <div className="w-24 h-1 bg-[#CC1414] mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pilih menu favoritmu! Ayam geprek bumbu rempah dengan tingkat kepedasan yang bisa disesuaikan.
          </p>
        </div>
      </section>

      {/* Category Filter Tabs */}
      <div className="sticky top-16 z-30 bg-white border-b shadow-sm px-4">
        <div className="container mx-auto flex gap-6 overflow-x-auto py-3">
          <button
            onClick={() => setSelectedCategory('semua')}
            className={`whitespace-nowrap text-sm font-medium transition ${
              selectedCategory === 'semua'
                ? 'text-[#CC1414] border-b-2 border-[#CC1414] font-semibold'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Semua
          </button>
          {menuData.categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`whitespace-nowrap text-sm font-medium transition ${
                selectedCategory === category.id
                  ? 'text-[#CC1414] border-b-2 border-[#CC1414] font-semibold'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Grid */}
      <section className="container mx-auto px-4 py-12">
        {filteredItems.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">Menu sedang dipersiapkan</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {filteredItems.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
