import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';

// firebase
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

// primeng
import { CarouselModule } from 'primeng/carousel';

// material
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';

import {MatStepperModule} from '@angular/material/stepper';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatNativeDateModule} from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


// components
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ImagePickerComponent } from './image-picker/image-picker.component';
import { MainCustomerComponent } from './main-customer/main-customer.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { MainRestaurantComponent } from './main-restaurant/main-restaurant.component';
import { RestaurantEditComponent } from './restaurant-edit/restaurant-edit.component';
import { RestaurantMenuComponent } from './restaurant-menu/restaurant-menu.component';
import { RestaurantAddDishComponent } from './restaurant-add-dish/restaurant-add-dish.component';
import { RestaurantCommentsComponent } from './restaurant-comments/restaurant-comments.component';
import { RestaurantEditDishComponent } from './restaurant-edit-dish/restaurant-edit-dish.component';
import { MainCustomerLayoutComponent } from './main-customer-layout/main-customer-layout.component';
import { MainCustomerSearchComponent } from './main-customer-search/main-customer-search.component';
import { MainCustomerRestaurantsComponent } from './main-customer-restaurants/main-customer-restaurants.component';
import { MainCustomerFoodDetailsComponent } from './main-customer-food-details/main-customer-food-details.component';
import { MainCustomerRestaurantDetailsComponent } from './main-customer-restaurant-details/main-customer-restaurant-details.component';
import { MainCustomerCartComponent } from './main-customer-cart/main-customer-cart.component';
import { MainCustomerProfileComponent } from './main-customer-profile/main-customer-profile.component';
import { MainCustomerFavDishComponent } from './main-customer-fav-dish/main-customer-fav-dish.component';
import { MainCustomerFavRestaurantComponent } from './main-customer-fav-restaurant/main-customer-fav-restaurant.component';
import { MainCustomerPaymentMethodsComponent } from './main-customer-payment-methods/main-customer-payment-methods.component';
import { MainCustomerPaymentAddComponent } from './main-customer-payment-add/main-customer-payment-add.component';
import { MainCustomerProfileUpdateComponent } from './main-customer-profile-update/main-customer-profile-update.component';
import { MainCustomerOrderSuccessComponent } from './main-customer-order-success/main-customer-order-success.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    MainComponent,
    ProfileDetailsComponent,
    ImagePickerComponent,
    MainRestaurantComponent,
    MainCustomerComponent,
    RestaurantEditComponent,
    RestaurantMenuComponent,
    RestaurantCommentsComponent,
    RestaurantAddDishComponent,
    RestaurantEditDishComponent,
    MainCustomerLayoutComponent,
    MainCustomerRestaurantsComponent,
    MainCustomerRestaurantDetailsComponent,
    MainCustomerFoodDetailsComponent,
    MainCustomerSearchComponent,
    MainCustomerCartComponent,
    MainCustomerProfileComponent,
    MainCustomerFavDishComponent,
    MainCustomerFavRestaurantComponent,
    MainCustomerPaymentMethodsComponent,
    MainCustomerPaymentAddComponent,
    MainCustomerProfileUpdateComponent,
    MainCustomerOrderSuccessComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatSelectModule,
    MatStepperModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    CarouselModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    MatTabsModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
