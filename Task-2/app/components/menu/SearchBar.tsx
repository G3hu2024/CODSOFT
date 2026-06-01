import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="px-6 py-4">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-400" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search for dishes..."
          className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white border-2 border-red-100 focus:border-red-300 focus:outline-none shadow-sm transition-all"
        />
      </div>
    </div>
  );
}
