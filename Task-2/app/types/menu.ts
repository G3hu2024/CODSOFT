export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  cookingTime: number;
  category: string;
  ingredients: string[];
  calories: number;
  spiceLevel?: number;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}
