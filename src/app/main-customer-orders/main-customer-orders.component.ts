import { Component, inject } from '@angular/core';
import { OrderService } from '../services/order.service';
import { UserService } from '../services/user.service';
import { UtilsService } from '../services/utils.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-customer-orders',
  templateUrl: './main-customer-orders.component.html',
  styleUrls: ['./main-customer-orders.component.css']
})
export class MainCustomerOrdersComponent {
  orderService: OrderService = inject(OrderService);
  userService: UserService = inject(UserService);
  utilsService: UtilsService = inject(UtilsService);
  router: Router = inject(Router);

  handleOrderClick(orderId: string): void {
    this.router.navigate([`main/profile/orders/${orderId}`]);
  }
}
