import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from './services/user.service';
import { FoodService } from './services/food.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard {
  private userService: UserService = inject(UserService);
  private foodService: FoodService = inject(FoodService);
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map(user => {
        if (user) {
          const retries = 20;
          let counter = 0;
          const interval = setInterval(() => {
            if (this.userService.loaded) {
              if (!this.userService.getUserByUID(user.uid)!) {
                this.router.navigate(['/profile-details', user.uid]); 
                return false;
              }
              this.userService.setCurrentUser(this.userService.getUserByUID(user.uid)!);
              clearInterval(interval);
            } else {
              counter++;
              if (counter === retries) {
                clearInterval(interval);
              }
            }
            return false;
          }, 100);
          return true; // User is logged in
        } else {
          this.router.navigate(['/login']); // Redirect to login page if user is not logged in
          return false;
        }
      })
    );
  }
}
