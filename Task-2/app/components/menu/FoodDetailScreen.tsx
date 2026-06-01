import { ArrowLeft, Star, Clock, Flame, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { MenuItem } from '../../types/menu';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface FoodDetailScreenProps {
  item: MenuItem;
  onBack: () => void;
  onAddToCart: (quantity: number) => void;
}

export function FoodDetailScreen({ item, onBack, onAddToCart }: FoodDetailScreenProps) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    onAddToCart(quantity);
    onBack();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-red-50">
      <div className="relative">
        <div className="h-80 bg-gradient-to-br from-amber-100 to-red-100">
          <ImageWithFallback
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>

        <button
          onClick={onBack}
          className="absolute top-6 left-6 p-3 bg-white/95 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all"
        >
          <ArrowLeft className="w-5 h-5 text-red-900" />
        </button>

        <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
            <span className="font-bold text-red-900">{item.rating}</span>
            <span className="text-red-700">({item.reviews} reviews)</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-t-[2rem] -mt-6 relative z-10 px-6 pt-6 pb-32">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-red-900 mb-2">{item.name}</h1>
            <p className="text-red-700">{item.description}</p>
          </div>
        </div>

        <div className="flex items-center space-x-6 mb-6 pb-6 border-b border-red-100">
          <div className="flex items-center space-x-2 text-red-700">
            <Clock className="w-5 h-5" />
            <div>
              <p className="text-xs">Cooking Time</p>
              <p className="font-semibold">{item.cookingTime} min</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-red-700">
            <Flame className="w-5 h-5" />
            <div>
              <p className="text-xs">Calories</p>
              <p className="font-semibold">{item.calories} kcal</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-bold text-lg text-red-900 mb-3">Ingredients</h3>
          <div className="flex flex-wrap gap-2">
            {item.ingredients.map((ingredient, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-red-50 text-red-900 rounded-full text-sm border border-red-100"
              >
                {ingredient}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-bold text-lg text-red-900 mb-3">About this dish</h3>
          <p className="text-red-700 leading-relaxed">
            Our {item.name.toLowerCase()} is carefully prepared by our expert chefs using the finest ingredients.
            Each dish is crafted with attention to detail, ensuring a memorable dining experience.
            Perfect for those who appreciate quality and authentic flavors.
          </p>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-red-100 px-6 py-4 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <span className="text-red-700">Quantity</span>
            <div className="flex items-center space-x-3 bg-red-50 rounded-full px-2 py-1 border-2 border-red-200">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 text-red-900 hover:bg-red-100 rounded-full transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-bold text-red-900">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 text-red-900 hover:bg-red-100 rounded-full transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-red-700">Total Price</p>
            <p className="text-2xl font-bold text-red-900">${(item.price * quantity).toFixed(2)}</p>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full bg-red-900 text-amber-50 py-4 rounded-2xl hover:bg-red-800 transition-all flex items-center justify-center space-x-2 shadow-lg"
        >
          <ShoppingCart className="w-5 h-5" />
          <span className="font-semibold">Add to Cart</span>
        </button>
      </div>
    </div>
  );
}
