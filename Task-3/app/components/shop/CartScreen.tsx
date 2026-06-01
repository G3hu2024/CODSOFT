import { ArrowLeft, Trash2, ShoppingBag, Tag } from 'lucide-react';
import { CartItem } from '../../types/shop';
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
  const shipping = subtotal > 100 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="sticky top-0 z-10 bg-stone-50/95 backdrop-blur-md border-b border-stone-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-stone-700 hover:text-emerald-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Continue Shopping</span>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-stone-900">Shopping Cart</h1>
            <p className="text-sm text-stone-600">{items.length} {items.length === 1 ? 'item' : 'items'}</p>
          </div>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <div className="w-32 h-32 bg-stone-200 rounded-full mx-auto mb-8 flex items-center justify-center">
            <ShoppingBag className="w-16 h-16 text-stone-400" />
          </div>
          <h2 className="text-3xl font-bold text-stone-900 mb-4">Your cart is empty</h2>
          <p className="text-stone-600 mb-8">Discover our beautiful collection and find something you love</p>
          <button
            onClick={onBack}
            className="bg-emerald-800 text-stone-50 px-8 py-4 rounded-full hover:bg-emerald-900 transition-all"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex space-x-6">
                    <div className="w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden bg-stone-100">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-stone-900 mb-1">{item.name}</h3>
                          <div className="flex items-center space-x-3 text-sm text-stone-600">
                            <span>Size: {item.selectedSize}</span>
                            <span>•</span>
                            <span>Color: {item.selectedColor}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="p-2 text-stone-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 bg-stone-100 rounded-xl px-3 py-2">
                          <button
                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="text-stone-700 hover:text-emerald-800 transition-colors"
                          >
                            −
                          </button>
                          <span className="w-8 text-center font-medium text-stone-900">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="text-stone-700 hover:text-emerald-800 transition-colors"
                          >
                            +
                          </button>
                        </div>

                        <span className="text-xl font-semibold text-stone-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="bg-white rounded-2xl p-6 shadow-sm space-y-6">
                <h3 className="text-xl font-bold text-stone-900">Order Summary</h3>

                <div className="space-y-3 pb-6 border-b border-stone-200">
                  <div className="flex items-center justify-between text-stone-700">
                    <span>Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-stone-700">
                    <span>Shipping</span>
                    <span className="font-medium">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex items-center justify-between text-stone-700">
                    <span>Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xl">
                  <span className="font-bold text-stone-900">Total</span>
                  <span className="font-bold text-emerald-800">${total.toFixed(2)}</span>
                </div>

                {subtotal < 100 && (
                  <div className="bg-stone-100 rounded-xl p-4 flex items-start space-x-3">
                    <Tag className="w-5 h-5 text-emerald-800 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-stone-700">
                      Add <span className="font-semibold">${(100 - subtotal).toFixed(2)}</span> more to get free shipping
                    </p>
                  </div>
                )}

                <button
                  onClick={onCheckout}
                  className="w-full bg-emerald-800 text-stone-50 py-4 rounded-xl hover:bg-emerald-900 transition-all flex items-center justify-center space-x-2 shadow-lg"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span className="font-medium">Proceed to Checkout</span>
                </button>

                <p className="text-xs text-center text-stone-500">
                  Secure checkout powered by Stripe
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
