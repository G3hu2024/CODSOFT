import { Category } from '../../types/menu';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export function CategoryFilter({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="px-6 pb-4">
      <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`flex-shrink-0 px-5 py-2.5 rounded-full border-2 transition-all ${
              selectedCategory === category.id
                ? 'bg-red-900 border-red-900 text-amber-50 shadow-lg scale-105'
                : 'bg-white border-red-200 text-red-900 hover:border-red-300'
            }`}
          >
            <span className="flex items-center space-x-2">
              <span>{category.icon}</span>
              <span className="text-sm font-medium">{category.name}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
