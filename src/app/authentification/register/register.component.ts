import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user/user.service';
import { SignupRequest } from 'src/app/utils/signupRequest';
declare var $:any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  
  loading = false;
  info = false;
  classInfo :string;
  infoMessage: string;
  user = new SignupRequest();
  constructor(private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  onRegister() {
    this.loading = true;
    $("#btn-register").prop('disabled', true);
    //this.user.role = "client";
    this.authenticationService.register(this.user).subscribe(
      res => {
       window.scrollTo(0, 0);
       $("#btn-register").prop('disabled', false);
        this.loading = false;
        this.info = true;
        this.classInfo = "alert alert-success";
        this.infoMessage = res.message +" Please check your Mailbox to confirm your account";
      },
     error => {
        window.scrollTo(0,0);
        this.loading = false;
        $("#btn-register").prop('disabled', false);
        this.info = true;
        this.classInfo = "alert alert-danger";
        this.infoMessage = error;
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
 