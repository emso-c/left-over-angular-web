import { Injectable } from '@angular/core';
import { Cart, Food } from '../shared/models';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: Cart = {items: []};

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
  }
  decreaseQuantity(food: Food) {
    const item = this.cart.items.find(item => item.food._id === food._id);
    if (item) {
      item.quantity--;
      if (item.quantity === 0) {
        this.removeFromCart(food._id);
      }
    }
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
