import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ConfirmComponent } from './pages/confirm/confirm.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, data: { title: 'S\'authentifier' } },
  { path: 'register', component: RegisterComponent, data: { title: 'S\'inscire' } },
  { path: 'confirm', component: ConfirmComponent, data: { title: 'Confirmation d\'email' } },
  { path: 'forgot-password', component: ForgotPasswordComponent, data: { title: 'Récupérer mon mot de passe' } },
  { path: 'reset-password', component: ResetPasswordComponent, data: { title: 'Changer mot de passe' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
