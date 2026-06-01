import { useState } from 'react';
import { MenuItem } from '../../types/menu';
import { Header } from './Header';
import { SearchBar } from './SearchBar';
import { CategoryFilter } from './CategoryFilter';
import { FoodCard } from './FoodCard';
import { RecentlyViewed } from './RecentlyViewed';
import { categories } from '../../data/menuData';

interface HomeScreenProps {
  items: MenuItem[];
  recentlyViewed: MenuItem[];
  cartItemCount: number;
  onSelectItem: (item: MenuItem) => void;
  onAddToCart: (item: MenuItem) => void;
  onCartClick: () => void;
}

export function HomeScreen({
  items,
  recentlyViewed,
  cartItemCount,
  onSelectItem,
  onAddToCart,
  onCartClick,
}: HomeScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-red-50">
      <Header cartItemCount={cartItemCount} onCartClick={onCartClick} />
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <RecentlyViewed items={recentlyViewed} onSelectItem={onSelectItem} />

      <div className="px-6 pb-6">
        <h2 className="text-xl font-bold text-red-900 mb-4">
          {selectedCategory === 'all' ? 'All Dishes' : categories.find(c => c.id === selectedCategory)?.name}
        </h2>
        <div className="grid grid-cols-1 gap-6">
          {filteredItems.map((item) => (
            <FoodCard
              key={item.id}
              item={item}
              onSelect={() => onSelectItem(item)}
              onAddToCart={(e) => {
                e.stopPropagation();
                onAddToCart(item);
              }}
            />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-red-700">No dishes found matching your search</p>
          </div>
        )}
      </div>
    </div>
  );
}
