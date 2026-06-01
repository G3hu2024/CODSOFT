import { ArrowLeft, Star, Heart, ShoppingBag, Truck, RefreshCw, Shield } from 'lucide-react';
import { useState } from 'react';
import { Product } from '../../types/shop';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface ProductDetailScreenProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (size: string, color: string, quantity: number) => void;
}

export function ProductDetailScreen({ product, onBack, onAddToCart }: ProductDetailScreenProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    onAddToCart(selectedSize, selectedColor, quantity);
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="sticky top-0 z-10 bg-stone-50/95 backdrop-blur-md border-b border-stone-200 px-6 py-4">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-stone-700 hover:text-emerald-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="aspect-[3/4] bg-stone-100 rounded-3xl overflow-hidden">
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="flex items-start justify-between mb-4">
              <div>
                {product.isNew && (
                  <span className="inline-block bg-emerald-800 text-stone-50 text-xs px-3 py-1 rounded-full mb-3">
                    New Arrival
                  </span>
                )}
                <h1 className="text-4xl font-bold text-stone-900 mb-2">{product.name}</h1>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-stone-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-stone-600">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>
              <button className="p-3 bg-stone-100 rounded-full hover:bg-emerald-800 hover:text-stone-50 transition-colors">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center space-x-3 mb-6">
              <span className="text-3xl font-bold text-stone-900">${product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-stone-400 line-through">${product.originalPrice}</span>
              )}
            </div>

            <p className="text-stone-700 leading-relaxed mb-8">{product.description}</p>

            <div className="space-y-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-stone-900 mb-3">Select Size</label>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 rounded-xl border-2 transition-all ${
                        selectedSize === size
                          ? 'border-emerald-800 bg-emerald-800 text-stone-50'
                          : 'border-stone-200 text-stone-700 hover:border-emerald-800'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-900 mb-3">Select Color</label>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-6 py-3 rounded-xl border-2 transition-all ${
                        selectedColor === color
                          ? 'border-emerald-800 bg-stone-100'
                          : 'border-stone-200 hover:border-emerald-800'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-900 mb-3">Quantity</label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 rounded-xl border-2 border-stone-200 text-stone-700 hover:border-emerald-800 transition-colors"
                  >
                    −
                  </button>
                  <span className="text-xl font-medium text-stone-900 w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 rounded-xl border-2 border-stone-200 text-stone-700 hover:border-emerald-800 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-emerald-800 text-stone-50 py-4 rounded-xl hover:bg-emerald-900 transition-all flex items-center justify-center space-x-2 shadow-lg mb-8"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="font-medium">Add to Cart</span>
            </button>

            <div className="space-y-4 border-t border-stone-200 pt-8">
              <div className="flex items-center space-x-3 text-sm text-stone-700">
                <Truck className="w-5 h-5 text-emerald-800" />
                <span>Free shipping on orders over $100</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-stone-700">
                <RefreshCw className="w-5 h-5 text-emerald-800" />
                <span>30-day easy returns</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-stone-700">
                <Shield className="w-5 h-5 text-emerald-800" />
                <span>2-year warranty included</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
