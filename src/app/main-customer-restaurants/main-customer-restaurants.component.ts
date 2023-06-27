import { Component, inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../shared/models';

@Component({
  selector: 'app-main-customer-restaurants',
  templateUrl: './main-customer-restaurants.component.html',
  styleUrls: ['./main-customer-restaurants.component.css']
})
export class MainCustomerRestaurantsComponent {
  userService: UserService = inject(UserService)

  handleFavorite(restaurantCompositeId: string) {
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
