import { ShoppingBag, Search, Menu, User } from 'lucide-react';

interface NavigationProps {
  cartItemCount: number;
  onCartClick: () => void;
  onSearchClick: () => void;
}

export function Navigation({ cartItemCount, onCartClick, onSearchClick }: NavigationProps) {
  return (
    <nav className="sticky top-0 z-20 bg-stone-50/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button className="lg:hidden text-stone-800">
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex items-center space-x-12">
            <h1 className="text-2xl font-bold text-stone-900 tracking-tight">ÉTOILE</h1>
            <div className="hidden lg:flex items-center space-x-8">
              <a href="#" className="text-sm text-stone-700 hover:text-emerald-800 transition-colors">New Arrivals</a>
              <a href="#" className="text-sm text-stone-700 hover:text-emerald-800 transition-colors">Women</a>
              <a href="#" className="text-sm text-stone-700 hover:text-emerald-800 transition-colors">Men</a>
              <a href="#" className="text-sm text-stone-700 hover:text-emerald-800 transition-colors">Accessories</a>
              <a href="#" className="text-sm text-emerald-800 font-medium">Sale</a>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button onClick={onSearchClick} className="p-2 text-stone-700 hover:text-emerald-800 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="hidden md:block p-2 text-stone-700 hover:text-emerald-800 transition-colors">
              <User className="w-5 h-5" />
            </button>
            <button
              onClick={onCartClick}
              className="relative p-2 text-stone-700 hover:text-emerald-800 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-800 text-stone-50 text-xs rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
