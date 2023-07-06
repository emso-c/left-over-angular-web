import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Food, User } from '../shared/models';
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
  router: Router = inject(Router);

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.restaurant = this.userService.getUserByCompositeId(id)
    });
  }

  handleFoodClick(foodId: string, restaurantId: string) {
    this.router.navigate([`/main/restaurants/${restaurantId}/foods/${foodId}`])
  }

  isFavorite(restaurantCompositeId: string): boolean {
    return this.userService.currentUser?.details.favoriteRestaurants.includes(restaurantCompositeId)
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
  getDiscount(food: Food){
    const sales_price = food.sales_price;
    const main_price = food.main_price;
    const discount = (main_price - sales_price) / main_price * 100;
    return discount.toFixed(0);
  }
}

