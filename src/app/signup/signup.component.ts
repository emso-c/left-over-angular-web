import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  email: string | undefined;
  password: string | undefined;
  isLoading: boolean = false;

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  signup() {
    this.isLoading = true;
    let errMsg: string = "";
    if (!this.email || !this.password) {
      alert("email and password are required");
      this.isLoading = false;
      return;
    }
    this.afAuth.createUserWithEmailAndPassword(this.email!, this.password!)
      .then((userCredential) => {
        this.router.navigate(['/profile-details', userCredential.user?.uid]);
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/weak-password":
            errMsg = "The password is too weak.";
            break;
          case "auth/email-already-in-use":
            errMsg = "The email address is already in use by another account.";
            break;
          case "auth/invalid-email":
            errMsg = "The email address is badly formatted.";
            break;
          default:
            errMsg = "Signup failed";
            break;
        }
      })
      .finally(() => {
        this.isLoading = false;
        if (errMsg) {
          alert(errMsg);
        }
      });
  }
}
