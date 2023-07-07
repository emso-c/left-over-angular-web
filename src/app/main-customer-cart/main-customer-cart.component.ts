import { Component, inject } from '@angular/core';
import { CartService } from '../services/cart.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { PaymentService } from '../services/payment.service';
import { CreditCard, Order } from '../shared/models';
import { UserService } from '../services/user.service';
import { UtilsService } from '../services/utils.service';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-customer-cart',
  templateUrl: './main-customer-cart.component.html',
  styleUrls: ['./main-customer-cart.component.css']
})
export class MainCustomerCartComponent {
  cartService: CartService = inject(CartService)
  paymentService: PaymentService = inject(PaymentService)
  utilsService: UtilsService = inject(UtilsService)
  userService: UserService = inject(UserService)
  orderService: OrderService = inject(OrderService)
  creditCards: CreditCard[] = []
  router: Router = inject(Router)
  selectedCreditCard: CreditCard | null = null;
  _formBuilder: FormBuilder = inject(FormBuilder)
  confirmed = false;

  ngOnInit() {
    this.paymentService.creditCards$.subscribe((creditCards) => {
      this.creditCards = creditCards.filter((creditCard) => creditCard.createdBy == this.userService.currentUser?.details?._id);
    });
  }

  handleSecondForm(){
    const secondCtrl = this.secondFormGroup.get('secondCtrl') as FormControl;
    secondCtrl.setValue(this.selectedCreditCard);
    secondCtrl.updateValueAndValidity();

    // click the button again
    document.getElementById('second-form-button')?.click();
  }

  async handleThirdForm(){
    const thirdCtrl = this.thirdFormGroup.get('thirdCtrl') as FormControl;
    if (this.confirmed){
      this.router.navigate(['main/order-success']);
      return;
    }
    try {
      this.confirmed = await this.confirmShoppingCart();
      if(this.confirmed){
        thirdCtrl.setValue(this.cartService.totalSalesPrice);
        thirdCtrl.updateValueAndValidity();
        document.getElementById('third-form-button')?.click();
      }
    } catch (err) {
      alert('Siparişiniz alınamadı. Lütfen tekrar deneyiniz.')
    }
  }

  handleCreditCardClick(creditCard: CreditCard){
    this.selectedCreditCard = creditCard;
  }

  async confirmShoppingCart(): Promise<boolean>{
    if (this.cartService.hasMixedRestaurants){
      alert('Sepetinizde aynı restorandan olmayan ürünler bulunmaktadır. Lütfen sepetinizi kontrol ediniz.')
      return false;
    }

    if (this.cartService.isEmpty){
      alert('Sepetinizde ürün bulunmamaktadır.')
      return false;
    }
    
    const order: Order = {
      _id: this.utilsService.generateUUID(),
      cardId: this.selectedCreditCard!._id,
      commentId: '', // no comments when placing order
      commented: false,
      createdAt: this.utilsService.getCurrentDate(),
      createdBy: this.userService.currentUser!.details!._id,
      foodAmount: 0,
      foodsId: this.cartService.cart.items.flatMap((item) =>Array(item.quantity).fill(item.food._id)),
      restaurantId: this.userService.getRestaurantByFoodId(this.cartService.cart.items[0].food._id)!.details!._id,
      totalAmount: this.cartService.totalSalesPrice+this.utilsService.consts.TAX,
    }

    return new Promise((resolve, reject) => {
      this.orderService.placeOrder(order).then(() => {
        this.cartService.clearCart();
        resolve(true);
      }).catch((err) => {
        reject(err);
      });
    });
  }


  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: [null, Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: [null, Validators.required],
  });
  isLinear = false;
}
