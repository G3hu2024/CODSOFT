import { X, Search } from 'lucide-react';
import { useState } from 'react';
import { Product } from '../../types/shop';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface SearchModalProps {
  products: Product[];
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export function SearchModal({ products, onClose, onSelectProduct }: SearchModalProps) {
  const [query, setQuery] = useState('');

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/50 backdrop-blur-sm">
      <div className="min-h-screen flex items-start justify-center p-6 pt-24">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[80vh] flex flex-col">
          <div className="p-6 border-b border-stone-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-stone-900">Search Products</h3>
              <button
                onClick={onClose}
                className="p-2 text-stone-400 hover:text-stone-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for products..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-stone-200 focus:border-emerald-800 focus:outline-none"
                autoFocus
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {query.length === 0 ? (
              <p className="text-center text-stone-500 py-12">Start typing to search products</p>
            ) : filteredProducts.length === 0 ? (
              <p className="text-center text-stone-500 py-12">No products found for "{query}"</p>
            ) : (
              <div className="space-y-3">
                {filteredProducts.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                    className="w-full flex items-center space-x-4 p-4 rounded-xl hover:bg-stone-50 transition-colors text-left"
                  >
                    <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-stone-100">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-stone-900 mb-1">{product.name}</h4>
                      <p className="text-sm text-stone-600 truncate">{product.description}</p>
                    </div>
                    <span className="text-lg font-semibold text-emerald-800">${product.price}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
