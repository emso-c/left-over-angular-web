interface Food {
  _id: string;
  title: string;
  description: string;
  main_price: number;
  sales_price: number;
  img: string | null;
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
}

interface RestaurantDetails {
  _id: string;
  type: "restaurant";
  createdAt: string;
  description: string;
  title: string;
  comments: string[] | null;
  img: string | null;
  foods: string[] | null;
}

interface User {
  uid: string;
  email: string;
  // put any to solve the problem of the details property
  // it's not supposed to be there
  details: any | CustomerDetails | RestaurantDetails;
}

export type { CustomerDetails, RestaurantDetails, Food, User };