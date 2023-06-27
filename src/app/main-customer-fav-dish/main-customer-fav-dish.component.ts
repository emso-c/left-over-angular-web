import { Component, inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { FoodService } from '../services/food.service';
import { Food } from '../shared/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-customer-fav-dish',
  templateUrl: './main-customer-fav-dish.component.html',
  styleUrls: ['./main-customer-fav-dish.component.css']
})
export class MainCustomerFavDishComponent {
  userService: UserService = inject(UserService)
  foodService: FoodService = inject(FoodService)
  foods: Food[] = []
  router: Router = inject(Router)

  constructor() {
    let counter = 0;
    const intervalId = setInterval(() => {
      if (this.foodService.loaded) {
        this.foods = this.foodService.foods.filter(food => this.userService.currentUser?.details?.favoriteDishes.includes(food._id));
        clearInterval(intervalId);
      }
      if (counter >= 10) {
        clearInterval(intervalId);
      }
      counter++;
    }, 100);
  }

  handleFoodClick(foodId: string) {
    this.router.navigate(['main/foods', foodId]);
  }
}
