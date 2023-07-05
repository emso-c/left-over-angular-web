import { Component, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';

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

  options: AnimationOptions = {
    path: '/assets/animations/welcome-lottie.json',
  }

  login() {
    this.isLoading = true;
    this.afAuth.signInWithEmailAndPassword(this.email!, this.password!)
      .then((userCredential) => {
        this.router.navigate(['/main']);
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/missing-email":
            setTimeout(() => {
              alert("Giriş başarısız, email adresi eksik")
            }, 100);
            break;
          case "auth/user-not-found":
            setTimeout(() => {
              alert("Giriş başarısız, kullanıcı bulunamadı")
            }, 100);
            break;
          case "auth/wrong-password":
            setTimeout(() => {
              alert("Giriş başarısız, yanlış şifre")
            }, 100);
            break;
          default:
            setTimeout(() => {
              alert("Bilinmeyen bir hata oluştu")
            }, 100);
            break;
        }
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
}
