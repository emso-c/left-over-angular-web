import { Component, inject } from '@angular/core';
import { getDownloadURL } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { UtilsService } from '../services/utils.service';
import { RestaurantDetails } from '../shared/models';

@Component({
  selector: 'app-restaurant-edit',
  templateUrl: './restaurant-edit.component.html',
  styleUrls: ['./restaurant-edit.component.css']
})
export class RestaurantEditComponent {
  userService: UserService = inject(UserService);
  private imgFile: File | undefined;
  private router: Router = inject(Router);
  private utilsService: UtilsService = inject(UtilsService);
  isSubmitting = false;
  fetchingData = false;
  restaurantFormData = {
    id: '',
    img: '',
    email: '',
    title: '',
    description: ''
  }

  constructor() {
    this.fetchingData = true;

    const retries = 10;
    const interval = 100;
    let counter = 0;
    const intervalId = setInterval(() => {
      const details = this.userService.currentUser?.details!
      if (details) {
        this.restaurantFormData = {
          id: details._id,
          img: details.img,
          email: details.email,
          title: details.title,
          description: details.description
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

  handleRestaurantImageChange(file: File) {
    this.imgFile = file;
  }
  submitRestaurantEditForm() {
    this.isSubmitting = true;
    const data: RestaurantDetails = {
      _id: this.userService.currentUser!.details!._id,
      title: this.restaurantFormData.title,
      description: this.restaurantFormData.description,
      img: this.imgFile ? null : this.userService.currentUser!.details!.img,
      type: 'restaurant',
      createdAt: this.userService.currentUser!.details!.createdAt,
      foods: this.userService.currentUser!.details!.foods,
      comments: this.userService.currentUser!.details!.comments
    }

    const updateCurrentUserDetails = () => {
      this.userService.updateCurrentUserDetails(data)!
        .then(() => {
          this.isSubmitting = false;
          setTimeout(() => {
            alert('Restoran bilgileriniz güncellendi.');
            window.location.reload();
          }, 100);
        });
    };

    if (this.imgFile) {
      this.userService.uploadImage(this.userService.currentUser!.uid, this.imgFile!)
        .then((snapshot) => getDownloadURL(snapshot.ref))
        .then((downloadURL) => {
          data.img = downloadURL as string;
          updateCurrentUserDetails();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      updateCurrentUserDetails();
    }
  }
  resetRestaurantForm() {
    // Reset the form data
    this.restaurantFormData = {
      id: '',
      img: '',
      email: '',
      title: '',
      description: ''
    }
  }
}
