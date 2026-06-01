import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { CartItem } from '../../types/menu';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface CartScreenProps {
  items: CartItem[];
  onBack: () => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export function CartScreen({ items, onBack, onUpdateQuantity, onRemoveItem, onCheckout }: CartScreenProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-red-50 flex flex-col">
      <div className="sticky top-0 z-10 bg-white border-b border-red-100 px-6 py-4 shadow-sm">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-2 text-red-900 hover:bg-red-50 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-red-900">Your Cart</h1>
            <p className="text-sm text-red-700">{items.length} {items.length === 1 ? 'item' : 'items'}</p>
          </div>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-32 h-32 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <ShoppingBag className="w-16 h-16 text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-red-900 mb-2">Your cart is empty</h2>
          <p className="text-red-700 mb-6">Add some delicious items to get started</p>
          <button
            onClick={onBack}
            className="bg-red-900 text-amber-50 px-8 py-3 rounded-xl hover:bg-red-800 transition-all shadow-lg"
          >
            Browse Menu
          </button>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl p-4 shadow-md">
                <div className="flex space-x-4">
                  <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-gradient-to-br from-amber-100 to-red-50">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-red-900 truncate">{item.name}</h3>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-sm text-red-700 mb-3">${item.price.toFixed(2)} each</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 bg-red-50 rounded-full px-2 py-1 border border-red-200">
                        <button
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="p-1 text-red-900 hover:bg-red-100 rounded-full transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-sm font-bold text-red-900">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-red-900 hover:bg-red-100 rounded-full transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-bold text-red-900">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white border-t-2 border-red-100 px-6 py-6 shadow-2xl">
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between text-red-700">
                <span>Subtotal</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-red-700">
                <span>Tax (10%)</span>
                <span className="font-semibold">${tax.toFixed(2)}</span>
              </div>
              <div className="h-px bg-red-200"></div>
              <div className="flex items-center justify-between text-red-900">
                <span className="text-lg font-bold">Total</span>
                <span className="text-2xl font-bold">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={onCheckout}
              className="w-full bg-red-900 text-amber-50 py-4 rounded-2xl hover:bg-red-800 transition-all shadow-lg flex items-center justify-center space-x-2"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="font-semibold">Proceed to Checkout</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
