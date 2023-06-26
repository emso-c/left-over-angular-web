import { Component, inject } from '@angular/core';
import { getDownloadURL } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { UtilsService } from '../services/utils.service';
import { Food, RestaurantDetails } from '../shared/models';
import { FoodService } from '../services/food.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-restaurant-add-dish',
  templateUrl: './restaurant-add-dish.component.html',
  styleUrls: ['./restaurant-add-dish.component.css']
})
export class RestaurantAddDishComponent {
  foodPlaceholder = 'https://nagrannar.is/images/food-placeholder.jpeg'
  userService: UserService = inject(UserService);
  foodService: FoodService = inject(FoodService);
  categoryService: CategoryService = inject(CategoryService);
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
    category: '',
    createdBy: '',
  }

  handleAddDishImageChange(file: File) {
    this.imgFile = file;
  }
  submitAddDishForm() {
    this.isSubmitting = true;
    const id = this.userService.currentUser!.uid;
    const details = this.userService.currentUser!.details!;
    
    const createdBy = this.userService.currentUser!.details!._id;
    const title = this.addDishFormData.title;
    const description = this.addDishFormData.description;
    const main_price: number = parseInt(this.addDishFormData.main_price.toString());
    const sales_price: number = parseInt(this.addDishFormData.sales_price.toString());
    const category = this.addDishFormData.category;

    if (!title || !description || !main_price || !sales_price || !category) {
      alert('Lütfen bütün alanları doldurunuz');
      this.isSubmitting = false;
      return;
    }

    if (sales_price >= main_price) {
      alert('İndirimli fiyat normal fiyattan yüksek olamaz');
      this.isSubmitting = false;
      return;
    }

    if (!this.imgFile) {
      alert('Lütfen bir resim seçiniz');
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
            category: category,
            createdBy: createdBy,
          }

          details.foods = details.foods ?? [];
          details.foods.push(food._id);

          const newDetails: RestaurantDetails = {
            _id: details._id,
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
  }
}
