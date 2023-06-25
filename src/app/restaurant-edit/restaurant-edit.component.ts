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

        // fetch image and set imgFile
        // FIXME: CORS error
        fetch(details.img, {
          method: 'GET',
          headers: {
            'Allow-Control-Allow-Origin': '*',
          }
        })
          .then(res => res.blob())
          .then(blob => {
            const file = new File([blob], 'profile-image', {});
            this.imgFile = file;
          })
          .catch(err => console.log(err));


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
  submitRestaurantForm() {
    this.isSubmitting = true;
    const id = this.userService.currentUser!.uid;
    const email = this.userService.currentUser!.email;
    const title = this.restaurantFormData.title;
    const description = this.restaurantFormData.description;
    const foods = this.userService.currentUser!.details!.foods;
    const comments = this.userService.currentUser!.details!.comments;

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
              foods: foods,
              comments: comments
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
      img: '',
      email: '',
      title: '',
      description: ''
    }
  }
}
