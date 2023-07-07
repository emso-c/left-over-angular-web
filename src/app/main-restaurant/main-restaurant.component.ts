import { Component, inject } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-main-restaurant',
  templateUrl: './main-restaurant.component.html',
  styleUrls: ['./main-restaurant.component.css']
})
export class MainRestaurantComponent {
  userService: UserService = inject(UserService)

}
