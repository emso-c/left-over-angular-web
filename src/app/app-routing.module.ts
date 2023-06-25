import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MainComponent } from './main/main.component';
import { LoginGuard } from './login.guard';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';

const routes: Routes = [
  { title: 'Login', path: 'login', component: LoginComponent },
  { title: 'Signup', path: 'signup', component: SignupComponent },
  { title: 'Main', path: 'main', component: MainComponent, canActivate: [LoginGuard] },
  { title: 'Profile Details', path: 'profile-details/:id', canActivate: [LoginGuard], component: ProfileDetailsComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
