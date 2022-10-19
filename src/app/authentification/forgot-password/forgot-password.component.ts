import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CookieService } from 'src/app/services/cookie.service';
import { UserService } from 'src/app/services/user/user.service';
import { ValidationRequest } from 'src/app/utils/validationRequest';
declare var $:any;

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
 validation = new ValidationRequest();

  formTitle: String = "Forgot password";
  formText: String = "Entrer votre adresse email et un code de validation vous sera envoyé.";
  loading = false;
  submitted_reset = false;
  returnUrl: string;
  message = '';
  classmsg = '';
  user = new User();

  constructor(private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,private cookie:CookieService) { }

  ngOnInit(): void {

    if (this.cookie.getCookie('email-reset') || this.cookie.getCookie('forgot-password')) {
      this.submitted_reset = true;
      this.formText = "Entrer le code de validation envoyé à votre adresse email!";
    }
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  } 

  onResetPassword() {
    this.loading = true;
    
    $("#btn-forgot").prop('disabled', true);
    $("#btn-validation").prop('disabled', true);
    
    this.authenticationService.forgotPassword(this.user).subscribe(
      res => {
        this.message ='';
        this.loading = false;
        this.submitted_reset = true;
        $("#btn-forgot").prop('disabled', false);
        $("#btn-validation").prop('disabled', false);
        this.formTitle = "Validation";
        this.formText = "Entrer le code de validation envoyé à votre adresse email!";
        this.classmsg = "alert alert-success";
        this.message = "Verifiez votre adresse email un code vous a été envoyé!";
      },
      (error) => {
        this.loading = false;
        $("#btn-forgot").prop('disabled', false);
        $("#btn-validation").prop('disabled', false);
        this.classmsg = "alert alert-danger";
        this.message = error;
      }
    )
  }

  onResendCode() {
    this.cookie.deleteCookie("email-reset");
    this.cookie.deleteCookie("forgot-password");
    
    location.reload();
  }

  onCodeValidation() {
    
    $("#btn-validation").prop('disabled', true);
    $("#btn-forgot").prop('disabled', true);
    this.authenticationService.validCode(this.validation).subscribe(
      res => {
        $("#btn-validation").prop('disabled', false);
        $("#btn-forgot").prop('disabled', false);
        this.router.navigate(["/auth/recuperation-de-mot-passe"]);
      }, error => {
        this.classmsg = "alert alert-danger";
        $("#btn-validation").prop('disabled', false);
        $("#btn-forgot").prop('disabled', false);
        this.message = error;
      }
    )
  }

}
