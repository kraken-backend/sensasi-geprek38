// Path: src/components/ui/MenuCard.tsx
'use client';

import Image from 'next/image';
import { MenuItem } from '@/types/menu';
import { RESTAURANT } from '@/lib/constants';

/**
 * Displays a single menu item with image, details, and order button.
 * @param item - MenuItem data object
 * @returns JSX.Element
 */
export default function MenuCard({ item }: { item: MenuItem }) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition relative overflow-hidden">
      {/* Image Container */}
      <div className="relative aspect-video w-full">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover rounded-t-xl"
          loading="lazy"
        />

        {/* Popular Badge */}
        {item.isPopular && (
          <span className="absolute top-2 left-2 bg-[#CC1414] text-white text-xs px-2 py-1 rounded-full">
            Terlaris
          </span>
        )}

        {/* Sold Out Overlay */}
        {!item.available && (
          <div className="absolute inset-0 bg-black/50 rounded-t-xl flex items-center justify-center">
            <span className="text-white font-bold">Habis</span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-3">
        <p className="font-semibold text-gray-900 text-sm line-clamp-2">
          {item.name}
        </p>
        <p className="text-gray-500 text-xs line-clamp-2 mt-1">
          {item.description}
        </p>
        <p className="font-bold text-gray-900 text-sm mt-2">
          Rp {item.price.toLocaleString('id-ID')}
        </p>
        <a
          href={RESTAURANT.gofood}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full mt-3 rounded-full border border-[#CC1414] text-[#CC1414] text-sm py-2 block text-center hover:bg-[#CC1414] hover:text-white transition"
        >
          Pesan
        </a>
      </div>
    </div>
  );
}
