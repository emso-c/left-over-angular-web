import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';

import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';

import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MainComponent } from './main/main.component';
import { FormsModule } from '@angular/forms';
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
    MatFormFieldModule,
    MatSnackBarModule,
    MatSelectModule,
    MatStepperModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
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
