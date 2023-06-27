import { Component, inject } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-main-customer-profile',
  templateUrl: './main-customer-profile.component.html',
  styleUrls: ['./main-customer-profile.component.css']
})
export class MainCustomerProfileComponent {
  userService: UserService = inject(UserService)
  
}
