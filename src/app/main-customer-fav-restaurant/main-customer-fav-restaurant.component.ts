import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FoodService } from '../services/food.service';
import { UserService } from '../services/user.service';
import { Food, User } from '../shared/models';

@Component({
  selector: 'app-main-customer-fav-restaurant',
  templateUrl: './main-customer-fav-restaurant.component.html',
  styleUrls: ['./main-customer-fav-restaurant.component.css']
})
export class MainCustomerFavRestaurantComponent {
  userService: UserService = inject(UserService)
  restaurants: User[] = []
  router: Router = inject(Router)

  constructor() {
    let counter = 0;
    const intervalId = setInterval(() => {
      if (this.userService.loaded) {
        const favRestaurants = this.userService.currentUser?.details?.favoriteRestaurants;
        this.restaurants = this.userService.users.filter(user => favRestaurants.includes(user.details?._id));
        clearInterval(intervalId);
      }
      if (counter >= 10) {
        clearInterval(intervalId);
      }
      counter++;
    }, 100);
  }

  handleRestaurantClick(restaurantId: string) {
    this.router.navigate(['main/restaurants', restaurantId]);
  }

  isFavorite(restaurantCompositeId: string): boolean {
    return this.userService.currentUser?.details.favoriteRestaurants.includes(restaurantCompositeId)
  }
  handleFavorite(event: any, restaurantCompositeId: string) {
    event.stopPropagation();
    if (this.userService.currentUser?.details.favoriteRestaurants.includes(restaurantCompositeId)){
      this.userService.removeFavoriteRestaurant(restaurantCompositeId)
        .then(() => {
          this.restaurants.splice(this.restaurants.findIndex(restaurant => restaurant.details?._id === restaurantCompositeId), 1);
          // alert('Restoran favorilerinizden başarıyla çıkarıldı!')
        })
        .catch((err) => {
          alert(err.message)
        })
    } else {
      this.userService.addFavoriteRestaurant(restaurantCompositeId)
        .then(() => {
          // alert('Restoran favorilerinize başarıyla eklendi!')
        })
        .catch((err) => {
          alert(err.message)
        })
    }
  }
}
