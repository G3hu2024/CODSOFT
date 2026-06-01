import { useState } from 'react';
import { Navigation } from './components/shop/Navigation';
import { HeroSection } from './components/shop/HeroSection';
import { CategoryFilter } from './components/shop/CategoryFilter';
import { ProductCard } from './components/shop/ProductCard';
import { OfferBanner } from './components/shop/OfferBanner';
import { ProductDetailScreen } from './components/shop/ProductDetailScreen';
import { CartScreen } from './components/shop/CartScreen';
import { SearchModal } from './components/shop/SearchModal';
import { Product, CartItem } from './types/shop';
import { products, categories } from './data/shopData';
import { toast } from 'sonner';

type Screen = 'home' | 'detail' | 'cart';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showSearchModal, setShowSearchModal] = useState(false);

  const filteredProducts = products.filter((product) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'new') return product.isNew;
    return product.category === selectedCategory;
  });

  const bestsellers = products.filter((p) => p.isBestseller);

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentScreen('detail');
  };

  const handleAddToCart = (product: Product, size: string, color: string, quantity: number) => {
    setCartItems((prev) => {
      const existingItem = prev.find(
        (item) => item.id === product.id && item.selectedSize === size && item.selectedColor === color
      );
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id && item.selectedSize === size && item.selectedColor === color
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity, selectedSize: size, selectedColor: color }];
    });
    toast.success('Added to cart successfully');
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)));
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    toast.success('Item removed from cart');
  };

  const handleCheckout = () => {
    toast.success('Proceeding to checkout...');
    setCartItems([]);
    setCurrentScreen('home');
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="size-full bg-stone-50">
      {currentScreen === 'home' && (
        <>
          <Navigation
            cartItemCount={cartItemCount}
            onCartClick={() => setCurrentScreen('cart')}
            onSearchClick={() => setShowSearchModal(true)}
          />
          <HeroSection />
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          <section className="max-w-7xl mx-auto px-6 py-16">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-stone-900 mb-2">Bestsellers</h2>
                <p className="text-stone-600">Our most loved pieces</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {bestsellers.map((product) => (
                <ProductCard key={product.id} product={product} onSelect={() => handleSelectProduct(product)} />
              ))}
            </div>
          </section>

          <OfferBanner />

          <section className="max-w-7xl mx-auto px-6 py-16">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-stone-900 mb-2">
                  {selectedCategory === 'all' ? 'All Products' : categories.find((c) => c.id === selectedCategory)?.name}
                </h2>
                <p className="text-stone-600">{filteredProducts.length} items</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} onSelect={() => handleSelectProduct(product)} />
              ))}
            </div>
          </section>

          <footer className="bg-stone-900 text-stone-50 py-12 mt-16">
            <div className="max-w-7xl mx-auto px-6 text-center">
              <h3 className="text-2xl font-bold mb-2">ÉTOILE</h3>
              <p className="text-stone-400">Timeless fashion for the modern individual</p>
            </div>
          </footer>
        </>
      )}

      {currentScreen === 'detail' && selectedProduct && (
        <ProductDetailScreen
          product={selectedProduct}
          onBack={() => setCurrentScreen('home')}
          onAddToCart={(size, color, quantity) => {
            handleAddToCart(selectedProduct, size, color, quantity);
            setCurrentScreen('home');
          }}
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

      {showSearchModal && (
        <SearchModal
          products={products}
          onClose={() => setShowSearchModal(false)}
          onSelectProduct={handleSelectProduct}
        />
      )}
    </div>
  );
}
