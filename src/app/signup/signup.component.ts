import { Component, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AnimationOptions } from 'ngx-lottie';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  email: string | undefined;
  password: string | undefined;
  isLoading: boolean = false;
  private toast: HotToastService = inject(HotToastService);

  options: AnimationOptions = {
    path: '/assets/animations/welcome-lottie.json',
  }

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  signup() {
    this.isLoading = true;
    let errMsg: string = "";
    if (!this.email || !this.password) {
      setTimeout(() => {
        alert("Lütfen tüm alanları doldurunuz.");
      }, 100);
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
            errMsg = "Şifre çok zayıf";
            break;
          case "auth/email-already-in-use":
            errMsg = "Bu email adresi zaten kullanımda.";
            break;
          case "auth/invalid-email":
            errMsg = "Geçersiz email adresi";
            break;
          default:
            errMsg = "Bilinmeyen bir hata oluştu";
            break;
        }
      })
      .finally(() => {
        this.isLoading = false;
        if (errMsg) {
          setTimeout(() => {
            alert(errMsg);
          }, 100);
        }
      });
  }
}
