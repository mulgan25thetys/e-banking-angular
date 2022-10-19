import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user/user.service';
//import swal from 'sweetalert2'; 
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
authIsLocked = false;
  loading = false;
  submitted = false;
  returnUrl: string;
  errors = '';
  user = new User();

  constructor(private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,private service:UserService) { }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.authIsLocked = this.route.snapshot.queryParams['locked'];
    if (this.authIsLocked) {
      this.user = this.authenticationService.currentUserValue;
    }
  }

  onLogin() {
    this.submitted = true;
    this.loading = true;
    $("#btn-login").prop('disabled', true);
    this.authenticationService.login(this.user.username, this.user.password)
        .subscribe(
          data => {
            this.loading = false;
            $("#btn-login").prop('disabled', false);
            this.errors = '';
            if ((data?.roles.indexOf("ROLE_MEMBRE_DIRECTOIRE") !== -1
              || data?.roles.indexOf("ROLE_GESTIONNAIRE_CLIENTELE") !== -1
              || data?.roles.indexOf("ROLE_DECIDEUR") !== -1
              || data?.roles.indexOf("ROLE_CONSEILLER_CLIENTELE") !== -1
              || data?.roles.indexOf("ROLE_DIRECTEUR_FINANCIER") !== -1
              || data?.roles.indexOf("ROLE_GESTIONNAIRE_PATRIMOINE") !== -1
              || data?.roles.indexOf("ROLE_CONTROLEUR_GESTION") !== -1
              || data?.roles.indexOf("ROLE_CHARGE_ETUDE") !== -1
              || data?.roles.indexOf("ROLE_PERSONNEL_RH") !== -1
              || data?.roles.indexOf("ROLE_EMPLOYE_CAP") !== -1
            ) && (this.returnUrl.split("/")[1] == "espace-client" || this.returnUrl == "/")) {
              //this.showAlert(this.user.username, '/admin/dashboard');
                  this.router.navigate(['/admin/tableau-de-bords']);
              } else if((data?.roles.indexOf("ROLE_CLIENT") !== -1) && this.returnUrl.split("/")[1] == "admin") {
              //this.showAlert(this.user.username, this.returnUrl);
                   this.router.navigate(['/espace-client/mon-compte']);
            } else {
                this.router.navigate([this.returnUrl]);
              } 
            },
          error => {
            this.loading = false;
              $("#btn-login").prop('disabled', false);
                this.errors = error;
                this.loading = false;
            });
  }
  
  // showAlert(username:String,navigateUrl:String){
  //   swal.fire({
  //     title: 'Connection?',
  //     text: "Welcome "+username+", have a nice day!",
  //     icon: 'success',
  //     showConfirmButton: false,
  //     timer: 2000
  //   }).then(() =>{
  //     this.router.navigate([navigateUrl]);
  //   })
  // }

  showHidePassword() {
    if ($(document).find("#password").attr("type") == "password") {
      $(document).find("#password").prop("type", "text");
    } else {
      $(document).find("#password").prop("type", "password");
    }
  }

  getProfileUrl(value:any) {
    return 'url('+value+')';
  }
}