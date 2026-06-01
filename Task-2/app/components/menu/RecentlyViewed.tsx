import { MenuItem } from '../../types/menu';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Star } from 'lucide-react';

interface RecentlyViewedProps {
  items: MenuItem[];
  onSelectItem: (item: MenuItem) => void;
}

export function RecentlyViewed({ items, onSelectItem }: RecentlyViewedProps) {
  if (items.length === 0) return null;

  return (
    <div className="px-6 py-6">
      <h2 className="text-xl font-bold text-red-900 mb-4">Recently Viewed</h2>
      <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectItem(item)}
            className="flex-shrink-0 w-36 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all cursor-pointer overflow-hidden"
          >
            <div className="relative h-24 bg-gradient-to-br from-amber-100 to-red-50">
              <ImageWithFallback
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3">
              <h4 className="font-semibold text-sm text-red-900 mb-1 truncate">{item.name}</h4>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span className="text-xs text-red-700">{item.rating}</span>
                </div>
                <span className="text-sm font-bold text-red-900">${item.price.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
