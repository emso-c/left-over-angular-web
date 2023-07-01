import { Component, inject } from '@angular/core';
import { PaymentService } from '../services/payment.service';
import { CreditCard } from '../shared/models';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-main-customer-payment-methods',
  templateUrl: './main-customer-payment-methods.component.html',
  styleUrls: ['./main-customer-payment-methods.component.css']
})
export class MainCustomerPaymentMethodsComponent {
  paymentService: PaymentService = inject(PaymentService)
  userService: UserService = inject(UserService)
  creditCards: CreditCard[] = []
  loaded = false;

  ngOnInit() {
    this.paymentService.creditCards$.subscribe((creditCards) => {
      this.creditCards = creditCards;
    });
  }
}
