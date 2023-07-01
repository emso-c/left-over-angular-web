import { Component, inject } from '@angular/core';
import { PaymentService } from '../services/payment.service';
import { UtilsService } from '../services/utils.service';
import { CreditCard } from '../shared/models';
import { UserService } from '../services/user.service';
import { DateAdapter, MAT_DATE_FORMATS, NativeDateAdapter } from '@angular/material/core';

export const EXP_FORMAT = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


class AppDateAdapter extends NativeDateAdapter {
  override format(date: Date, displayFormat: Object): string {
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const year = date.getFullYear().toString().slice(2,4);
    return `${month}/${year}`;
     /*  if (displayFormat === 'input') {
          const month = date.getMonth() + 1;
          const year = date.getFullYear();
          return `${month}/${year}`;
      } else {
          return date.toDateString();
      } */
  }
}

@Component({
  selector: 'app-main-customer-payment-add',
  templateUrl: './main-customer-payment-add.component.html',
  styleUrls: ['./main-customer-payment-add.component.css'],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},  
    {provide: MAT_DATE_FORMATS, useValue: EXP_FORMAT}
  ],
})
export class MainCustomerPaymentAddComponent {
  paymentService: PaymentService = inject(PaymentService)
  userService: UserService = inject(UserService)
  utilsService: UtilsService = inject(UtilsService)
  
  creditCard: CreditCard = {
    _id: this.utilsService.generateUUID(),
    number: '',
    expirationDate: '',
    cvc: '',
    company: '',
    placeholder: '',
    createdBy: '',
  }

  constructor () {
    let counter = 0;
    const intervalId = setInterval(() => {
      if (this.userService.loaded) {
        this.creditCard.createdBy = this.userService.currentUser?.details?._id;
        console.log(this.creditCard)
        clearInterval(intervalId);
      }
      if (counter >= 10) {
        clearInterval(intervalId);
      }
      counter++;
    }, 100);
  }

  handleSubmit(){
    if (!this.creditCard.expirationDate){
      alert('Lütfen geçerli bir son kullanma tarihi giriniz.')
    }
    this.creditCard.expirationDate = this.utilsService.parseExpirationDate(this.creditCard.expirationDate)
    this.paymentService.addPaymentMethod(this.creditCard)
    .then(() => {
      console.log('Payment method added successfully')
      this.userService.updateCurrentUserDetails({
        creditCards: [...this.userService.currentUser?.details?.creditCards || [], this.creditCard._id],
        favoriteDishes: this.userService.currentUser?.details?.favoriteDishes || [],
        favoriteRestaurants: this.userService.currentUser?.details?.favoriteRestaurants || [],
        orders: this.userService.currentUser?.details?.orders || [],
        _id: this.userService.currentUser?.details?._id || '',
        img: this.userService.currentUser?.details?.img || '',
        gender: this.userService.currentUser?.details?.gender || '',
        name: this.userService.currentUser?.details?.name || '',
        surname: this.userService.currentUser?.details?.surname || '',
        email: this.userService.currentUser?.details?.email || '',
        createdAt: this.userService.currentUser?.details?.createdAt || '',
        type: this.userService.currentUser?.details?.type || '',
      })
      .then(() => {
        console.log('User details updated successfully')
        alert('Ödeme yöntemi başarıyla eklendi.')
      })
      .catch((err) => {
        console.log(err)
        alert('Ödeme yöntemi eklenirken bir hata oluştu. Hata kodu: (2)')
      })
    })
    .catch((err) => {
      console.log(err)
      alert('Ödeme yöntemi eklenirken bir hata oluştu. Hata kodu: (1)')
    })
  }
}
