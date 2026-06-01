import { Star, Clock, Plus } from 'lucide-react';
import { MenuItem } from '../../types/menu';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface FoodCardProps {
  item: MenuItem;
  onSelect: () => void;
  onAddToCart: (e: React.MouseEvent) => void;
}

export function FoodCard({ item, onSelect, onAddToCart }: FoodCardProps) {
  return (
    <div
      onClick={onSelect}
      className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all cursor-pointer overflow-hidden"
    >
      <div className="relative h-48 bg-gradient-to-br from-amber-100 to-red-50">
        <ImageWithFallback
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-semibold text-red-900">{item.rating}</span>
            <span className="text-xs text-red-700">({item.reviews})</span>
          </div>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-lg text-red-900 mb-1">{item.name}</h3>
        <p className="text-sm text-red-700 mb-3 line-clamp-2">{item.description}</p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1 text-red-700">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{item.cookingTime} min</span>
          </div>
          <span className="font-bold text-xl text-red-900">${item.price.toFixed(2)}</span>
        </div>

        <button
          onClick={onAddToCart}
          className="w-full bg-red-900 text-amber-50 py-3 rounded-xl hover:bg-red-800 transition-all flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
}
