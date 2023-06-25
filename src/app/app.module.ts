import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MainComponent } from './main/main.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { FormsModule } from '@angular/forms';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { ImagePickerComponent } from './image-picker/image-picker.component';
import { MainRestaurantComponent } from './main-restaurant/main-restaurant.component';
import { MainCustomerComponent } from './main-customer/main-customer.component';
import { RestaurantEditComponent } from './restaurant-edit/restaurant-edit.component';
import { RestaurantMenuComponent } from './restaurant-menu/restaurant-menu.component';
import { RestaurantCommentsComponent } from './restaurant-comments/restaurant-comments.component';
import { RestaurantAddDishComponent } from './restaurant-add-dish/restaurant-add-dish.component';
import { RestaurantEditDishComponent } from './restaurant-edit-dish/restaurant-edit-dish.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
