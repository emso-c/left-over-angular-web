import { Component, inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-restaurant',
  templateUrl: './main-restaurant.component.html',
  styleUrls: ['./main-restaurant.component.css']
})
export class MainRestaurantComponent {
  userService: UserService = inject(UserService)
  private afAuth: AngularFireAuth = inject(AngularFireAuth);
  router: Router = inject(Router)

  handleLogout() {
    this.afAuth.signOut()
      .then(() => {
        this.router.navigate(['/login']);
      }
    );
  }
}
