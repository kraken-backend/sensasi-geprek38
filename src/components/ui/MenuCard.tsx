// Path: src/components/ui/MenuCard.tsx
import Image from 'next/image';
import { MenuItem } from '@/types/menu';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RESTAURANT } from '@/lib/constants';

/**
 * Displays a single menu item with image, details, and order button.
 * @param item - MenuItem data object
 * @returns JSX.Element
 */
export default function MenuCard({ item }: { item: MenuItem }) {
  // Format price to IDR
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className="overflow-hidden group hover:shadow-md transition-shadow duration-300">
      <div className="relative h-48 w-full overflow-hidden bg-gray-100">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {!item.available && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
            <span className="text-white font-bold text-lg tracking-widest uppercase">Habis</span>
          </div>
        )}
        {item.isPopular && item.available && (
          <Badge className="absolute top-2 right-2 bg-[#E06800] hover:bg-[#E06800]/90">
            Terlaris
          </Badge>
        )}
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-lg font-bold leading-tight line-clamp-2">
            {item.name}
          </CardTitle>
          <span className="font-semibold text-[#CC1414] whitespace-nowrap">
            {formatPrice(item.price)}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="line-clamp-2 text-sm text-gray-600">
          {item.description}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full rounded-full bg-[#CC1414] hover:bg-[#A50000] text-white" 
          disabled={!item.available}
          asChild={item.available}
        >
          {item.available ? (
            <a href={RESTAURANT.gofood} target="_blank" rel="noopener noreferrer">
              Pesan
            </a>
          ) : (
            <span>Tidak Tersedia</span>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
