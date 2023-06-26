import { Component, inject } from '@angular/core';
import { getDownloadURL } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { UtilsService } from '../services/utils.service';
import { Food, RestaurantDetails } from '../shared/models';
import { FoodService } from '../services/food.service';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-restaurant-edit-dish',
  templateUrl: './restaurant-edit-dish.component.html',
  styleUrls: ['./restaurant-edit-dish.component.css']
})
export class RestaurantEditDishComponent {
  userService: UserService = inject(UserService);
  foodService: FoodService = inject(FoodService);
  categoryService: CategoryService = inject(CategoryService);
  route: ActivatedRoute = inject(ActivatedRoute);
  private imgFile: File | undefined;
  private router: Router = inject(Router);
  private utilsService: UtilsService = inject(UtilsService);
  isSubmitting = false;
  fetchingData = false;
  dishFormData: Food = {
    _id: '',
    img: '',
    title: '',
    description: '',
    main_price: 0,
    sales_price: 0,
    category: '',
    createdBy: ''
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.dishFormData._id = id;
    });
  }
  

  constructor() {
    this.fetchingData = true;
    
    const retries = 10;
    const interval = 100;
    let counter = 0;
    const intervalId = setInterval(() => {
      const food = this.foodService.foods?.find(food => food._id === this.dishFormData._id);
      if (food) {
        this.dishFormData = {
          _id: food._id,
          img: food.img,
          title: food.title,
          description: food.description,
          main_price: food.main_price,
          sales_price: food.sales_price,
          category: food.category,
          createdBy: food.createdBy,
        }

        this.fetchingData = false;
        clearInterval(intervalId);
      }
      counter++;
      if (counter === retries) {
        this.fetchingData = false;
        clearInterval(intervalId);
      }
    }, interval);
  }

  handleDishImageChange(file: File) {
    this.imgFile = file;
  }
  submitDishForm() {
    this.isSubmitting = true;

    if (this.dishFormData.sales_price >= this.dishFormData.main_price) {
      alert('İndirimli fiyat normal fiyattan yüksek olamaz');
      this.isSubmitting = false;
      return;
    }

    if (!this.imgFile) {
      const updatedFood: Food = this.dishFormData;
      this.foodService.updateFood(this.dishFormData._id, updatedFood)
        .then(() => {
          this.isSubmitting = false;
          this.router.navigate(['/main']);
        })
    } else {
      // TODO: remove old image
      const imageName = this.userService.currentUser?.details.foods.find((food: string) => food === this.dishFormData._id)
      // this.userService.removeImage(imageName!);
      
      this.userService.uploadImage(this.dishFormData._id, this.imgFile)
        .then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            const updatedFood: Food = {
              _id: this.dishFormData._id,
              img: url,
              title: this.dishFormData.title,
              description: this.dishFormData.description,
              main_price: this.dishFormData.main_price,
              sales_price: this.dishFormData.sales_price,
              category: this.dishFormData.category,
              createdBy: this.dishFormData.createdBy,
            }
            this.foodService.updateFood(this.dishFormData._id, updatedFood)
              .then(() => {
                this.isSubmitting = false;
                this.router.navigate(['/main']);
              })
          });
        });
    }

  }
}
