import { Component, inject } from '@angular/core';
import { getDownloadURL } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { UtilsService } from '../services/utils.service';
import { Food, RestaurantDetails } from '../shared/models';
import { FoodService } from '../services/food.service';

@Component({
  selector: 'app-restaurant-add-dish',
  templateUrl: './restaurant-add-dish.component.html',
  styleUrls: ['./restaurant-add-dish.component.css']
})
export class RestaurantAddDishComponent {
  foodPlaceholder = 'https://nagrannar.is/images/food-placeholder.jpeg'
  userService: UserService = inject(UserService);
  foodService: FoodService = inject(FoodService);
  private imgFile: File | undefined;
  private router: Router = inject(Router);
  private utilsService: UtilsService = inject(UtilsService);
  isSubmitting = false;
  addDishFormData: Food = {
    _id: '',
    img: '',
    title: '',
    description: '',
    main_price: 0,
    sales_price: 0,
  }

  handleAddDishImageChange(file: File) {
    this.imgFile = file;
  }
  submitAddDishForm() {
    this.isSubmitting = true;
    const id = this.userService.currentUser!.uid;
    const email = this.userService.currentUser!.email;
    const details = this.userService.currentUser!.details!;
    
    const title = this.addDishFormData.title;
    const description = this.addDishFormData.description;
    const main_price: number = parseInt(this.addDishFormData.main_price.toString());
    const sales_price: number = parseInt(this.addDishFormData.sales_price.toString());

    if (!title || !description || !main_price || !sales_price) {
      alert('Please fill out all the fields');
      this.isSubmitting = false;
      return;
    }

    if (sales_price > main_price) {
      alert('Sales price cannot be higher than main price');
      this.isSubmitting = false;
      return;
    }

    if (!this.imgFile) {
      alert('Please select an image');
      this.isSubmitting = false;
      return;
    }

    this.userService.uploadImage(id!, this.imgFile!)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          const food: Food = {
            _id: snapshot.ref.name,
            img: downloadURL,
            title: title,
            description: description,
            main_price: main_price,
            sales_price: sales_price,
          }

          details.foods = details.foods ?? [];
          details.foods.push(food._id);
          console.log('details', details)

          const newDetails: RestaurantDetails = {
            _id: email+'+'+id,
            title: details.title,
            description: details.description,
            img: details.img,
            type: details.type,
            createdAt: details.createdAt,
            foods: details.foods,
            comments: details.comments,
          }
          this.userService.updateCurrentUserDetails(newDetails)!
            .then(() => {
              this.foodService.addFood(food)
                .then(() => {
                  this.isSubmitting = false;
                  this.router.navigate(['/main'])
                })
                .catch((error) => {
                  console.log(error);
                  this.isSubmitting = false;
                });
            })
        });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.resetRestaurantForm();
      });
  }
  resetRestaurantForm() {
    // Reset the form data
    this.addDishFormData = {
      _id: '',
      img: '',
      title: '',
      description: '',
      main_price: 0,
      sales_price: 0,
    }
  }
}
