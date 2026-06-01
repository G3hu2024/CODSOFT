import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-stone-100 to-stone-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-24 lg:py-32">
        <div className="max-w-2xl">
          <span className="inline-block px-4 py-1.5 bg-emerald-800 text-stone-50 text-sm rounded-full mb-6">
            New Collection 2026
          </span>
          <h2 className="text-5xl lg:text-6xl font-bold text-stone-900 mb-6 leading-tight">
            Timeless Elegance<br />Meets Modern Style
          </h2>
          <p className="text-lg text-stone-700 mb-8 leading-relaxed">
            Discover our curated selection of premium fashion pieces. Each item is carefully selected for its quality, design, and timeless appeal.
          </p>
          <button className="group inline-flex items-center space-x-2 bg-emerald-800 text-stone-50 px-8 py-4 rounded-full hover:bg-emerald-900 transition-all shadow-lg hover:shadow-xl">
            <span>Shop New Arrivals</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
      <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-emerald-800/5 to-transparent hidden lg:block"></div>
    </section>
  );
}
