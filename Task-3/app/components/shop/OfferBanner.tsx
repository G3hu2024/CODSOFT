import { Sparkles } from 'lucide-react';

export function OfferBanner() {
  return (
    <section className="bg-gradient-to-r from-emerald-800 to-emerald-900 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <div className="p-3 bg-white/10 rounded-full">
              <Sparkles className="w-6 h-6 text-stone-50" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-stone-50 mb-1">Special Offer</h3>
              <p className="text-stone-200">Up to 40% off on selected items</p>
            </div>
          </div>
          <button className="bg-stone-50 text-emerald-800 px-8 py-3 rounded-full hover:bg-stone-100 transition-colors font-medium">
            Shop Sale
          </button>
        </div>
      </div>
    </section>
  );
}
