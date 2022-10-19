import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';

const routes: Routes = [
  { path: '', redirectTo: 'se-connecter', pathMatch: 'full' },
  { path: 'se-connecter', component: LoginComponent },
  { path: 's-abonner', component: RegisterComponent },
  { path: 'mot-de-passe-oublie', component: ForgotPasswordComponent },
  { path: 'recuperation-de-mot-passe',component:UpdatePasswordComponent},
  { path: 'confirm',component:ConfirmationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthentificationRoutingModule { }
