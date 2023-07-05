import {Component, inject} from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-main-customer-layout',
  templateUrl: './main-customer-layout.component.html',
  styleUrls: ['./main-customer-layout.component.css']
})
export class MainCustomerLayoutComponent {
  userService: UserService = inject(UserService)
  router: Router = inject(Router)
  private afAuth: AngularFireAuth = inject(AngularFireAuth);

  handleNotifClick(){
    this.router.navigate(['/main/notifications'])
  }

  handleLogout() {
    this.afAuth.signOut()
      .then(() => {
        this.router.navigate(['/login']);
      }
    );
  }

  handleBackClick(){
    window.history.back();
  }
}
