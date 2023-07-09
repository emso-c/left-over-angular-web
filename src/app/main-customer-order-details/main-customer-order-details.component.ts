import { Component, inject } from '@angular/core';
import { OrderService } from '../services/order.service';
import { UserService } from '../services/user.service';
import { UtilsService } from '../services/utils.service';
import { FoodService } from '../services/food.service';
import { CreditCard, Food, Order, User } from '../shared/models';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../services/payment.service';
import { CommentService } from '../services/comment.service';

@Component({
  selector: 'app-main-customer-order-details',
  templateUrl: './main-customer-order-details.component.html',
  styleUrls: ['./main-customer-order-details.component.css']
})
export class MainCustomerOrderDetailsComponent {
  // routes
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);

  // form
  comment: string = ''
  
  // services
  userService: UserService = inject(UserService)
  foodService: FoodService = inject(FoodService)
  orderService: OrderService = inject(OrderService)
  utilsService: UtilsService = inject(UtilsService)
  paymentService: PaymentService = inject(PaymentService)
  commentService: CommentService = inject(CommentService)
  
  // data
  restaurant: User | undefined;
  foods: Food[] = [];
  order: Order | undefined;
  creditCard: CreditCard | undefined;

  // loaders
  isSumbittingComment: boolean = false;

  isFavorite(restaurantCompositeId: string): boolean {
    return this.userService.currentUser?.details.favoriteRestaurants.includes(restaurantCompositeId)
  }

  ngOnInit(): void {
    let counter = 0
    const interval = setInterval(() => {
      if (this.orderService.loaded && this.foodService.loaded && this.userService.loaded) {
        this.route.params.subscribe(params => {
          const orderId = params['id'];
          this.order = this.orderService.getOrderById(orderId)
          this.restaurant = this.userService.getUserByCompositeId(this.order!.restaurantId)
          this.foods = this.order!.foodsId.map((foodId) => this.foodService.getFoodById(foodId)!)
          // cast to set
          this.foods = [...new Set(this.foods)]
          this.paymentService.creditCards$.subscribe((cards) => {
            this.creditCard = cards.find((card) => card._id === this.order!.cardId)
          })
          clearInterval(interval)
        });
      } else {
        counter++
        if (counter === 20) {
          clearInterval(interval)
        }
      }
    }, 100)
  }


  handleRestaurantClick(id: string): void {
    this.router.navigate([`main/restaurants/${id}`]);
  }

  handleFavoriteRestaurant(event: any, restaurantCompositeId: string) {
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

  handleSubmit(){
    this.isSumbittingComment = true;
    const commentId = this.utilsService.generateUUID();
    this.commentService.addComment({
      _id: commentId,
      createdAt: this.utilsService.getCurrentDate(),
      description: this.comment,
      user: {
        _id: this.userService.currentUser!.details._id,
        fullname: this.userService.currentUser!.details.name + ' ' + this.userService.currentUser!.details.surname,
        img: this.userService.currentUser!.details.img
      },
    })
    .then(() => {
      this.orderService.addComment(this.order!._id, commentId)
        .then(() => {
          const restaurant = this.userService.getUserByID(this.order!.restaurantId);
          if (!restaurant) {
            throw new Error('Restoran bulunamadı')
          }
          this.userService.addCommentToRestaurant(restaurant.details._id, commentId)
            .then(() => {
              alert('Yorumunuz başarıyla eklendi!')
            })
            .catch((err) => {
              alert(err.message)
            })
        })
        .catch((err) => {
          alert(err.message)
        })
    })
    .catch((err) => {
      alert(err.message)
    })
    .finally(() => {
      this.comment = '';
      this.isSumbittingComment = false;
    })
  }
}
