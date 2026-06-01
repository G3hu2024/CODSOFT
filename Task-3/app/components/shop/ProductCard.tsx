import { Heart, Star } from 'lucide-react';
import { Product } from '../../types/shop';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface ProductCardProps {
  product: Product;
  onSelect: () => void;
}

export function ProductCard({ product, onSelect }: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      onClick={onSelect}
      className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.isNew && (
          <span className="absolute top-4 left-4 bg-emerald-800 text-stone-50 text-xs px-3 py-1 rounded-full">
            New
          </span>
        )}
        {discount > 0 && (
          <span className="absolute top-4 right-4 bg-stone-900 text-stone-50 text-xs px-3 py-1 rounded-full">
            -{discount}%
          </span>
        )}
        <button className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <Heart className="w-4 h-4 text-stone-700" />
        </button>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-medium text-stone-900 group-hover:text-emerald-800 transition-colors">
            {product.name}
          </h3>
          {product.isBestseller && (
            <span className="flex-shrink-0 ml-2">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            </span>
          )}
        </div>

        <p className="text-sm text-stone-600 mb-3 line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-lg text-stone-900">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-stone-400 line-through">${product.originalPrice}</span>
            )}
          </div>
          <div className="flex items-center space-x-1 text-xs text-stone-500">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{product.rating}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2 mt-3">
          {product.colors.slice(0, 4).map((color, index) => (
            <div
              key={index}
              className="w-5 h-5 rounded-full border-2 border-stone-200"
              style={{
                backgroundColor: color.toLowerCase() === 'white' ? '#ffffff' :
                               color.toLowerCase() === 'black' ? '#000000' :
                               color.toLowerCase() === 'beige' || color.toLowerCase() === 'tan' ? '#D4C5B9' :
                               color.toLowerCase() === 'navy' ? '#001F3F' :
                               color.toLowerCase() === 'gray' || color.toLowerCase() === 'grey' ? '#808080' :
                               color.toLowerCase() === 'red' ? '#DC2626' :
                               color.toLowerCase() === 'burgundy' ? '#800020' :
                               color.toLowerCase() === 'gold' ? '#FFD700' :
                               '#A8A29E'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
