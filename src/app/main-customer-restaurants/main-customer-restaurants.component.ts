import { Component, inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../shared/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-customer-restaurants',
  templateUrl: './main-customer-restaurants.component.html',
  styleUrls: ['./main-customer-restaurants.component.css']
})
export class MainCustomerRestaurantsComponent {
  userService: UserService = inject(UserService)
  router: Router = inject(Router)
  
  isFavorite(restaurantCompositeId: string): boolean {
    return this.userService.currentUser?.details.favoriteRestaurants.includes(restaurantCompositeId)
  }
  handleRestaurantClick(restaurantCompositeId: string) {
    this.router.navigate(['/main/restaurants/' + restaurantCompositeId])
  }
  handleFavorite(event: any, restaurantCompositeId: string) {
    event.stopPropagation();
    if (this.userService.currentUser?.details.favoriteRestaurants.includes(restaurantCompositeId)){
      this.userService.removeFavoriteRestaurant(restaurantCompositeId)
        .then(() => {
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
