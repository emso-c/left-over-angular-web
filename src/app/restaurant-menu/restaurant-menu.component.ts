import { Component, inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { FoodService } from '../services/food.service';
import { Food } from '../shared/models';

@Component({
  selector: 'app-restaurant-menu',
  templateUrl: './restaurant-menu.component.html',
  styleUrls: ['./restaurant-menu.component.css']
})
export class RestaurantMenuComponent {
  userService: UserService = inject(UserService);
  foodService: FoodService = inject(FoodService);
  fetchingData = false;
  userFoods: Food[] = [];

  constructor() {
    this.fetchingData = true;
    const retries = 10;
    const interval = 100;
    let counter = 0;
    const intervalId = setInterval(() => {
      if (this.userService.currentUser && this.foodService.foods) {
        let foods: Food[] = [];
        this.userService.currentUser.details?.foods.forEach((foodId: string) => {
          const food = this.foodService.foods?.find(food => food._id === foodId);
          if (food) {
            foods.push(food);
          }
        });
        this.userFoods = foods;
        
        this.fetchingData = false;
        clearInterval(intervalId);
      }
      if (counter >= retries) {
        this.fetchingData = false;
        clearInterval(intervalId);
      }
      counter++;
    }, interval);
  }

  deleteFood(foodId: string) {
    if (!confirm('Bu Yemeği Silmek İstediğinize Emin Misiniz?')) {
      return;
    }
    this.fetchingData = true;
    this.userService.deleteFood(foodId)
    .then(() => {
      this.foodService.deleteFood(foodId)
      .then(() => {
        alert("Yemek başarıyla silindi.")
        this.fetchingData = false;
        window.location.reload();
      })
      .catch((error) => {
        alert("Yemek silinirken bir hata oluştu.")
        this.fetchingData = false;
      })
    })
    .catch((error) => {
      alert("Yemek silinirken bir hata oluştu.")
      console.error(error);
      this.fetchingData = false;
    })
  }
}
