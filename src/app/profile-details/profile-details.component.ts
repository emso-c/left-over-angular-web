import { Component, inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { getDownloadURL } from '@angular/fire/storage';
import { CustomerDetails, RestaurantDetails } from '../shared/models';
import { UtilsService } from '../services/utils.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent {
  currentPage = 'customer';
  userService: UserService = inject(UserService);
  private imgFile: File | undefined;
  private router: Router = inject(Router);
  private utilsService: UtilsService = inject(UtilsService);
  isSubmitting = false;
  
  changePage(page: string) {
    this.currentPage = page;
  }

  customerFormData = {
    id: '',
    email: '',
    name: '',
    surname: '',
    gender: ''
  }
  handleCustomerImageChange(file: File) {
    this.imgFile = file;
  }
  submitCustomerForm() {
    this.isSubmitting = true;
    const id = this.userService.currentUser!.uid;
    const email = this.userService.currentUser!.email;
    const name = this.customerFormData.name;
    const surname = this.customerFormData.surname;
    const gender = this.customerFormData.gender === "male" ? "male" : "female"
    this.customerFormData.id = id!;
    this.customerFormData.email = email!;

    if (!this.imgFile) {
      alert('Please select an image');
      this.isSubmitting = false;
      return;
    }

    this.userService.uploadImage(id!, this.imgFile!)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
            const data: CustomerDetails = {
              _id: email+'+'+id,
              email: email,
              name: name,
              surname: surname,
              img: downloadURL,
              gender: gender,
              type: 'customer',
              favoriteDishes: [],
              favoriteRestaurants: [],
              creditCards: [],
              orders: [],
              createdAt: this.utilsService.getCurrentDate()
            }
            console.log(data);
            this.userService.updateCurrentUserDetails(data)!
              .then(() => {
                  this.isSubmitting = false;
                  this.router.navigate(['/main']);
                }
              );
        });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.resetCustomerForm();
      });
  }
  resetCustomerForm() {
    // Reset the form data
    this.customerFormData = {
      id: '',
      email: '',
      name: '',
      surname: '',
      gender: ''
    }
  }


  restaurantFormData = {
    id: '',
    email: '',
    title: '',
    description: ''
  }
  handleRestaurantImageChange(file: File) {
    this.imgFile = file;
  }
  submitRestaurantForm() {
    this.isSubmitting = true;
    const id = this.userService.currentUser!.uid;
    const email = this.userService.currentUser!.email;
    const title = this.restaurantFormData.title;
    const description = this.restaurantFormData.description;

    if (!this.imgFile) {
      alert('Please select an image');
      this.isSubmitting = false;
      return;
    }

    this.userService.uploadImage(id!, this.imgFile!)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
            const data: RestaurantDetails = {
              _id: email+'+'+id,
              title: title,
              description: description,
              img: downloadURL,
              type: 'restaurant',
              createdAt: this.utilsService.getCurrentDate(),
              foods: [],
              comments: []
            }
            this.userService.updateCurrentUserDetails(data)!
              .then(() => {
                  this.isSubmitting = false;
                  this.router.navigate(['/main']);
                }
              );
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
    this.restaurantFormData = {
      id: '',
      email: '',
      title: '',
      description: ''
    }
  }
}
