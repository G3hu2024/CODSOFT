import { ShoppingCart, Menu } from 'lucide-react';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

export function Header({ cartItemCount, onCartClick }: HeaderProps) {
  return (
    <div className="sticky top-0 z-10 bg-gradient-to-r from-amber-50 to-red-50 border-b border-red-100">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button className="text-red-900">
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-red-900">La Maison</h1>
              <p className="text-xs text-red-700">Fine Dining Experience</p>
            </div>
          </div>

          <button
            onClick={onCartClick}
            className="relative p-3 bg-red-900 text-amber-50 rounded-full shadow-lg hover:bg-red-800 transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-400 text-red-900 text-xs rounded-full flex items-center justify-center font-bold">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
