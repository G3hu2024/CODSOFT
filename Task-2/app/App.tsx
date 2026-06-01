import { useState } from 'react';
import { HomeScreen } from './components/menu/HomeScreen';
import { FoodDetailScreen } from './components/menu/FoodDetailScreen';
import { CartScreen } from './components/menu/CartScreen';
import { MenuItem, CartItem } from './types/menu';
import { menuItems } from './data/menuData';
import { toast } from 'sonner';

type Screen = 'home' | 'detail' | 'cart';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<MenuItem[]>([]);

  const handleSelectItem = (item: MenuItem) => {
    setSelectedItem(item);
    setCurrentScreen('detail');

    setRecentlyViewed((prev) => {
      const filtered = prev.filter((i) => i.id !== item.id);
      return [item, ...filtered].slice(0, 5);
    });
  };

  const handleAddToCart = (item: MenuItem, quantity: number = 1) => {
    setCartItems((prev) => {
      const existingItem = prev.find((i) => i.id === item.id);
      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { ...item, quantity }];
    });
    toast.success(`${item.name} added to cart`);
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    toast.success('Item removed from cart');
  };

  const handleCheckout = () => {
    toast.success('Order placed successfully!');
    setCartItems([]);
    setCurrentScreen('home');
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
  <div
    className="min-h-screen bg-gray-100 flex justify-center items-center p-4"
  >
    <div
      className="w-full max-w-[430px] h-[90vh] bg-white rounded-[30px] overflow-y-auto shadow-2xl"
    >
      {currentScreen === 'home' && (
        <HomeScreen
          items={menuItems}
          recentlyViewed={recentlyViewed}
          cartItemCount={cartItemCount}
          onSelectItem={handleSelectItem}
          onAddToCart={(item) => handleAddToCart(item, 1)}
          onCartClick={() => setCurrentScreen('cart')}
        />
      )}

      {currentScreen === 'detail' && selectedItem && (
        <FoodDetailScreen
          item={selectedItem}
          onBack={() => setCurrentScreen('home')}
          onAddToCart={(quantity) => handleAddToCart(selectedItem, quantity)}
        />
      )}

      {currentScreen === 'cart' && (
        <CartScreen
          items={cartItems}
          onBack={() => setCurrentScreen('home')}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onCheckout={handleCheckout}
        />
      )}
    </div>
  </div>
);
}