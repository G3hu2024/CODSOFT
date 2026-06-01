import { Category } from '../../types/shop';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export function CategoryFilter({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="border-b border-stone-200 bg-stone-50/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center space-x-8 overflow-x-auto pb-px scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`flex-shrink-0 py-4 px-2 border-b-2 transition-colors ${
                selectedCategory === category.id
                  ? 'border-emerald-800 text-emerald-800'
                  : 'border-transparent text-stone-600 hover:text-stone-900'
              }`}
            >
              <span className="text-sm font-medium">{category.name}</span>
              <span className="ml-2 text-xs text-stone-400">({category.count})</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
