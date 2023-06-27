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

const routes: Routes = [
  { title: 'Login', path: 'login', component: LoginComponent },
  { title: 'Signup', path: 'signup', component: SignupComponent },
  {
    title: 'Main', path: 'main', component: MainComponent, canActivate: [LoginGuard],
    children: [
      { title: 'Customer', path: 'home', component: MainCustomerComponent },
      {
        title: 'Restaurants', path: 'restaurants',
        children: [
          { title: 'Restaurant Details', path: ':id', component: MainCustomerRestaurantDetailsComponent },
          { title: 'Restaurants', path: '', component: MainCustomerRestaurantsComponent },
        ],
      },
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
