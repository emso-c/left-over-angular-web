import { Injectable } from '@angular/core';
import { Cart, Food } from '../shared/models';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: Cart = {
    items: []
  };

  get isEmpty(): boolean {
    return this.cart.items.length === 0;
  }

  get totalQuantity(): number {
    return this.cart.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  get totalSalesPrice(): number {
    return this.cart.items.reduce((sum, item) => sum + item.food.sales_price * item.quantity, 0);
  }

  get totalMainPrice(): number {
    return this.cart.items.reduce((sum, item) => sum + item.food.main_price * item.quantity, 0);
  }

  get hasMixedRestaurants(): boolean {
    // check if the cart has items from more than one restaurant
    return new Set(this.cart.items.map(item => item.food.createdBy)).size > 1;
  }

  private updateLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  constructor() {
    const cart = localStorage.getItem('cart');
    if (cart) {
      this.cart = JSON.parse(cart);
    }
  }

  getQuantity(food: Food) {
    const item = this.cart.items.find(item => item.food._id === food._id);
    return item ? item.quantity : 0;
  }
  increaseQuantity(food: Food) {
    const item = this.cart.items.find(item => item.food._id === food._id);
    if (item) {
      item.quantity++;
    }
    else {
      this.addToCart(food);
    }
    this.updateLocalStorage();
  }
  decreaseQuantity(food: Food) {
    const item = this.cart.items.find(item => item.food._id === food._id);
    if (item) {
      item.quantity--;
      if (item.quantity === 0) {
        this.removeFromCart(food._id);
      }
    }
    this.updateLocalStorage();
  }
  private addToCart(food: Food) {
    this.cart.items.push({
      food,
      quantity: 1
    })
  }
  private removeFromCart(foodId: string) {
    const index = this.cart.items.findIndex(item => item.food._id === foodId);
    if (index !== -1) {
      this.cart.items.splice(index, 1);
    }
  }
}
