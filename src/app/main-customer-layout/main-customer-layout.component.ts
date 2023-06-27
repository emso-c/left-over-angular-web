import {Component, inject} from '@angular/core';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-main-customer-layout',
  templateUrl: './main-customer-layout.component.html',
  styleUrls: ['./main-customer-layout.component.css']
})
export class MainCustomerLayoutComponent {
  userService: UserService = inject(UserService)
}
