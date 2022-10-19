import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthentificationRoutingModule } from './authentification-routing.module';
import { AuthentificationComponent } from './authentification.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AuthentificationComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ConfirmationComponent,
    UpdatePasswordComponent
  ],
  imports: [
    CommonModule,
    AuthentificationRoutingModule,
    FormsModule
  ]
})
export class AuthentificationModule { }
