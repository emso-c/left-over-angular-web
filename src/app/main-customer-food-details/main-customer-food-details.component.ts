import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from '../services/food.service';
import { UserService } from '../services/user.service';
import { Food } from '../shared/models';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-main-customer-food-details',
  templateUrl: './main-customer-food-details.component.html',
  styleUrls: ['./main-customer-food-details.component.css']
})
export class MainCustomerFoodDetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  userService: UserService = inject(UserService);
  foodService: FoodService = inject(FoodService);
  cartService: CartService = inject(CartService);
  food: Food | undefined;
  discount: number | null = 0; // discount is in percentage

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      
      const retries = 10;
      let counter = 0;
      const interval = 100;
      const intervalId = setInterval(() => {
        if (this.foodService.loaded) {
          this.food = this.foodService.getFoodById(id);
          const sales_price = this.food?.sales_price;
          const main_price = this.food?.main_price;
          this.discount = sales_price && main_price ? Math.round((1 - sales_price / main_price) * 100) : null;
          clearInterval(intervalId);
        }
        else {
          counter++;
        }
        if (counter === retries) {
          clearInterval(intervalId);
        }
      }, interval);
    });
  }

  isFavorite(foodId: string): boolean {
    return this.userService.currentUser?.details?.favoriteDishes?.includes(foodId)
  }

  getDiscount(food: Food){
    const sales_price = food.sales_price;
    const main_price = food.main_price;
    const discount = (main_price - sales_price) / main_price * 100;
    return Math.round(discount);
  }

  handleFavorite(event: any, foodId: string) {
    event.stopPropagation();
    if (this.userService.currentUser?.details?.favoriteDishes?.includes(foodId)){
      this.userService.removeFavoriteDish(foodId)
        .then(() => {
          // alert('Yemek favorilerinizden başarıyla çıkarıldı!')
        })
        .catch((err: { message: any; }) => {
          alert(err.message)
        })
    } else {
      this.userService.addFavoriteDish(foodId)
        .then(() => {
          // alert('Yemek favorilerinize başarıyla eklendi!')
        })
        .catch((err: { message: any; }) => {
          alert(err.message)
        })
    }
  }
}
