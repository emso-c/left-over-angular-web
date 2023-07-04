import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MainComponent } from './main/main.component';
import { LoginGuard } from './login.guard';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { RestaurantEditComponent } from './restaurant-edit/restaurant-edit.component';
import { RestaurantCommentsComponent } from './restaurant-comments/restaurant-comments.component';
import { RestaurantMenuComponent } from './restaurant-menu/restaurant-menu.component';
import { RestaurantAddDishComponent } from './restaurant-add-dish/restaurant-add-dish.component';
import { RestaurantEditDishComponent } from './restaurant-edit-dish/restaurant-edit-dish.component';
import { MainCustomerComponent } from './main-customer/main-customer.component';
import { MainRestaurantComponent } from './main-restaurant/main-restaurant.component';
import { MainCustomerRestaurantsComponent } from './main-customer-restaurants/main-customer-restaurants.component';
import { MainCustomerRestaurantDetailsComponent } from './main-customer-restaurant-details/main-customer-restaurant-details.component';
import { MainCustomerSearchComponent } from './main-customer-search/main-customer-search.component';
import { MainCustomerFoodDetailsComponent } from './main-customer-food-details/main-customer-food-details.component';
import { MainCustomerCartComponent } from './main-customer-cart/main-customer-cart.component';
import { MainCustomerProfileComponent } from './main-customer-profile/main-customer-profile.component';
import { MainCustomerFavDishComponent } from './main-customer-fav-dish/main-customer-fav-dish.component';
import { MainCustomerFavRestaurantComponent } from './main-customer-fav-restaurant/main-customer-fav-restaurant.component';
import { MainCustomerPaymentMethodsComponent } from './main-customer-payment-methods/main-customer-payment-methods.component';
import { MainCustomerPaymentAddComponent } from './main-customer-payment-add/main-customer-payment-add.component';
import { MainCustomerProfileUpdateComponent } from './main-customer-profile-update/main-customer-profile-update.component';
import { MainCustomerOrderSuccessComponent } from './main-customer-order-success/main-customer-order-success.component';
import { MainCustomerOrdersComponent } from './main-customer-orders/main-customer-orders.component';
import { MainCustomerOrderDetailsComponent } from './main-customer-order-details/main-customer-order-details.component';
import { MainCustomerCampaignDetailsComponent } from './main-customer-campaign-details/main-customer-campaign-details.component';
import { MainCustomerNotificationsComponent } from './main-customer-notifications/main-customer-notifications.component';

const routes: Routes = [
  { title: 'Login', path: 'login', component: LoginComponent },
  { title: 'Signup', path: 'signup', component: SignupComponent },
  { title: 'Main', path: 'main', component: MainComponent, canActivate: [LoginGuard],
    children: [
      { title: 'Home', path: 'home', component: MainCustomerComponent },
      { title: 'Restaurants', path: 'restaurants',
        children: [
          { title: 'Restaurants', path: '', component: MainCustomerRestaurantsComponent },
          { title: 'Restaurant Details', path: ':id', 
            children: [
              { title: 'Restaurant Details', path: '', component: MainCustomerRestaurantDetailsComponent },
              { title: 'Food Details', path: 'foods/:id', component: MainCustomerFoodDetailsComponent },
            ]
          },
      ]},
      { title: 'Profile', path: 'profile',
        children: [
          { title: 'Profile', path: '', component: MainCustomerProfileComponent },
          { title: 'Update Profile', path: 'update', component: MainCustomerProfileUpdateComponent },
          { title: 'Favorite Dishes', path: 'favorite-dishes', component: MainCustomerFavDishComponent },
          { title: 'Favorite Restaurants', path: 'favorite-restaurants', component: MainCustomerFavRestaurantComponent },
          { title: 'Orders', path: 'orders', component: MainCustomerOrdersComponent },
          { title: 'Order Details', path: 'orders/:id', component: MainCustomerOrderDetailsComponent},
          { title: 'Payment Methods', path: 'payment-methods', 
            children: [
              { title: 'Payment Methods', path: '', component: MainCustomerPaymentMethodsComponent },
              { title: 'Add Payment Method', path: 'add', component: MainCustomerPaymentAddComponent },
            ],
          },
        ]},
      { title: 'Search', path: 'search', component: MainCustomerSearchComponent },
      { title: 'Notifications', path: 'notifications', component: MainCustomerNotificationsComponent },
      { title: 'Campaign Details', path: 'campaign-details/:id', component: MainCustomerCampaignDetailsComponent },
      { title: 'My Cart', path: 'cart', component: MainCustomerCartComponent },
      { title: 'Order Places', path: 'order-success', component: MainCustomerOrderSuccessComponent },
      { title: 'Food Details', path: 'foods/:id', component: MainCustomerFoodDetailsComponent },
      { path: '', redirectTo: '/main/home', pathMatch: 'full' },
    ]
  },
  { title: 'Profile Details', path: 'profile-details/:id', canActivate: [LoginGuard], component: ProfileDetailsComponent },
  { title: 'Restaurant Edit', path: 'restaurant-edit', canActivate: [LoginGuard], component: RestaurantEditComponent },
  { title: 'Restaurant Menu', path: 'restaurant-menu', canActivate: [LoginGuard], component: RestaurantMenuComponent },
  { title: 'Restaurant Comments', path: 'restaurant-comments', canActivate: [LoginGuard], component: RestaurantCommentsComponent },
  { title: 'Restaurant Add Dish', path: 'restaurant-add-dish', canActivate: [LoginGuard], component: RestaurantAddDishComponent },
  { title: 'Restaurant Edit Dish', path: 'restaurant-edit-dish/:id', canActivate: [LoginGuard], component: RestaurantEditDishComponent },
  { path: '', redirectTo: '/main', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
