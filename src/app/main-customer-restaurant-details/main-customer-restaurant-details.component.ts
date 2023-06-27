import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../shared/models';
import { CommentService } from '../services/comment.service';
import { FoodService } from '../services/food.service';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-main-customer-restaurant-details',
  templateUrl: './main-customer-restaurant-details.component.html',
  styleUrls: ['./main-customer-restaurant-details.component.css']
})
export class MainCustomerRestaurantDetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  userService: UserService = inject(UserService);
  commentService: CommentService = inject(CommentService);
  foodService: FoodService = inject(FoodService);
  utilsService: UtilsService = inject(UtilsService);
  restaurant: User | undefined;

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.restaurant = this.userService.getUserByCompositeId(id)
    });
  }

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
