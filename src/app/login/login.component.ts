import { Component, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string | undefined;
  password: string | undefined;
  isLoading: boolean = false;
  private afAuth = inject(AngularFireAuth);
  private router = inject(Router);

  login() {
    this.isLoading = true;
    this.afAuth.signInWithEmailAndPassword(this.email!, this.password!)
      .then((userCredential) => {
        this.router.navigate(['/main']);
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/missing-email":
            alert("login failed, invalid email");
            break;
          case "auth/user-not-found":
            alert("login failed, user not found");
            break;
          case "auth/wrong-password":
            alert("login failed, wrong password");
            break;
          default:
            alert("login failed, error: " + error.code);
            break;
        }
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
}
