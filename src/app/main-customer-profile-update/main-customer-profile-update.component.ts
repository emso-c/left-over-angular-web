import { Component, inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { getDownloadURL } from '@angular/fire/storage';
import { CustomerDetails } from '../shared/models';

@Component({
  selector: 'app-main-customer-profile-update',
  templateUrl: './main-customer-profile-update.component.html',
  styleUrls: ['./main-customer-profile-update.component.css']
})
export class MainCustomerProfileUpdateComponent {
  userService: UserService = inject(UserService);
  private imgFile: File | undefined;
  isSubmitting = false;
  customerFormData = {
    name: this.userService.currentUser!.details!.name,
    surname: this.userService.currentUser!.details!.surname,
    gender: this.userService.currentUser!.details!.gender,
    img: this.userService.currentUser!.details!.img
  }

  ngOnInit() {
    const user = this.userService.currentUser;
    console.log(user)
  }

  handleCustomerImageChange(file: File) {
    this.imgFile = file;
  }
  submitCustomerForm() {
    const data: CustomerDetails = {
      _id: this.userService.currentUser!.details!._id,
      email: this.userService.currentUser!.email,
      name: this.customerFormData.name,
      surname: this.customerFormData.surname,
      img: this.imgFile ? null : this.userService.currentUser!.details!.img,
      gender: this.customerFormData.gender === "male" ? "male" : "female",
      type: 'customer',
      favoriteDishes: this.userService.currentUser!.details!.favoriteDishes || [],
      favoriteRestaurants: this.userService.currentUser!.details!.favoriteRestaurants || [],
      creditCards: this.userService.currentUser!.details!.creditCards || [],
      orders: this.userService.currentUser!.details!.orders || [],
      createdAt: this.userService.currentUser!.details!.createdAt
    };
  
    const updateCurrentUserDetails = () => {
      this.userService.updateCurrentUserDetails(data)!
        .then(() => {
          this.isSubmitting = false;
          alert('Profil bilgileriniz güncellendi.');
          window.location.reload();
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
  
  
}
