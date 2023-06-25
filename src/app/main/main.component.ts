import { Component, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { FoodService } from '../services/food.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  private afAuth: AngularFireAuth = inject(AngularFireAuth);
  private router: Router = inject(Router);
  userService: UserService = inject(UserService);
  foodService: FoodService = inject(FoodService);

  constructor() {}

  logout() {
    this.afAuth.signOut()
      .then(() => {
        this.router.navigate(['/login']);
      }
    );
  }
}
