import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user/user.service';
import { CookieService } from '../../../../services/cookie.service';
declare var $:any;

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  loading = false;
  submitted = false;
  returnUrl: string;
  errors = '';
  user = new User();

  constructor(private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,private cookie:CookieService) { }

  ngOnInit(): void {
    if (!this.cookie.getCookie('reset-confirmation')) {
      this.router.navigateByUrl('/auth/forgot-password');
    }
  }

  onEditPassword() {
    this.loading = true;
    $("#btn-reset").prop('disabled', true);
    this.authenticationService.resetPassword(this.user).subscribe(
      res => {
        this.loading = false;
        this.cookie.deleteCookie('email-reset');
        $("#btn-reset").prop('disabled', false);
        this.router.navigate(["/auth/login"]);
      },
      error => {
        this.loading = false;
        $("#btn-reset").prop('disabled', false);
        this.errors = error;
      }
    )
  }

  showPassword() {
     
      if($(document).find("#password").attr('type') == "password" ) {
        $(document).find("#password").prop('type', "text");
        $(document).find("#confirmpassword").prop('type', "text");
        $(document).find("#showhide").html("hide password");
      } else {
        $(document).find("#password").prop('type', "password");
        $(document).find("#confirmpassword").prop('type', "password");
        $(document).find("#showhide").html("show password");
      }

  }
  
  confirmPassword() {
    return this.user.password == this.user.confirmpassword;
  }
}
