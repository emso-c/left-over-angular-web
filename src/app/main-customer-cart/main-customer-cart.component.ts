import { Component, inject } from '@angular/core';
import { CartService } from '../services/cart.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-main-customer-cart',
  templateUrl: './main-customer-cart.component.html',
  styleUrls: ['./main-customer-cart.component.css']
})
export class MainCustomerCartComponent {
  cartService: CartService = inject(CartService)
  _formBuilder: FormBuilder = inject(FormBuilder)



  constructor(){
    if(this.cartService.cart.items){
      console.log(this.cartService.cart.items)
    }
    this.firstFormGroup.markAllAsTouched()
  }

  confirmShoppingCart(){
    if (this.cartService.hasMixedRestaurants){
      alert('Aynı restorandan olmayan ürünler sepetinizde bulunmaktadır. Lütfen sepetinizi kontrol ediniz.')
      return;
    }

    if (this.cartService.isEmpty){
      alert('Sepetinizde ürün bulunmamaktadır.')
      return;
    }

    alert('Siparişiniz alınmıştır. Teşekkür ederiz.')
    // TODO place order
  }


  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  isLinear = false;
}
