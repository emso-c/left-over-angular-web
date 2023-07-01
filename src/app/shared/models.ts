interface Food {
  _id: string;
  title: string;
  description: string;
  main_price: number;
  sales_price: number;
  img: string | null;
  category: string;
  createdBy: string;
}

interface CustomerDetails {
  _id: string;
  type: "customer";
  createdAt: string;
  email: string;
  name: string;
  surname: string;
  gender: "male" | "female";
  img: string | null;
  favoriteDishes: string[] | null;
  favoriteRestaurants: string[] | null;
  orders: string[] | null;
  creditCards: string[] | null;
}

interface RestaurantDetails {
  _id: string;
  type: "restaurant";
  createdAt: string;
  description: string;
  title: string;
  img: string | null;
  comments: string[] | null;
  foods: string[] | null;
}

interface User {
  uid: string;
  email: string;
  // put any to solve the problem of the details property
  // it's not supposed to be there
  details: any | CustomerDetails | RestaurantDetails;
}

interface Category {
  _id: string;
  key: string;
  img: string;
  label: string;
}

interface Comment {
  _id: string;
  createdAt: string;
  description: string;
  user: {
    _id: string;
    fullName: string;
    img: string;
  }
}

interface Campaign {
  _id: string;
  category: string;
  description: string;
  img: string;
  title: string;
}

interface CartItem {
  food: Food;
  quantity: number;
}

interface Cart {
  items: CartItem[];
}

interface CreditCard {
  _id: string;
  company: string;
  createdBy: string;
  cvc: string;
  expirationDate: string;
  number: string;
  placeholder: string;
}

export type {
  CustomerDetails,
  RestaurantDetails,
  Food,
  User,
  Category,
  Comment,
  Campaign,
  CartItem,
  Cart,
  CreditCard
};