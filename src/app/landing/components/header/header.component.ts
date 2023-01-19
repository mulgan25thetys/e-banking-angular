import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { CookieService } from 'src/app/services/cookie.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  totalNoViewNotifications: number = 0;
  logged = false;
  user = new User();
  profileLoaded = false;
  id: any;
  isThisCurrency: String ="EUR";
  constructor(private authService: AuthenticationService,private notifServe:NotificationService,
    private userService: UserService,private router:Router,private cookieServe:CookieService) { }

  ngOnInit(): void {

    if (this.cookieServe.getCookie("currency")) {
      (<HTMLSelectElement>document.getElementById('current_currency')).value = this.cookieServe.getCookie("currency");
    } else {
        let currency = (<HTMLSelectElement>document.getElementById('current_currency')).value;
        this.cookieServe.setCookie({ 'name': "currency", 'value': currency });
    }
    
    this.getTotalNotifications();
    
    if (this.authService.currentUserValue && this.authService.currentUserValue.roles[0] == "ROLE_CLIENT") {
      this.logged = true;
      this.getUser(this.authService.currentUserValue.id);
    } else {
      this.logged = false;
    }
    
  }

  getUpdateCurrency() {
    let currency = (<HTMLSelectElement>document.getElementById('current_currency')).value;
    this.cookieServe.deleteCookie("currency");
    this.cookieServe.setCookie({ 'name': "currency", 'value': currency });
    window.location.reload();    
  }

  getTotalNotifications() {
    if (this.authService.currentUserValue != null) {
      this.notifServe.getAllNoViewNotifications(this.authService.currentUserValue.id).subscribe(
      res => {
        this.totalNoViewNotifications = res.length;
      }
    )
    }
  }

  getUser(id:any) {
    this.userService.getUser(id).subscribe(
      res => {
        if (res.role.name == "ROLE_CLIENT") {
          this.user = res; 
          this.logged = true;
          this.userService.getProfile(this.user.profile).subscribe(
          res => {
            this.profileLoaded = true;
            this.user.profileUrl = res.message;
          },error => {console.error(error)}
        )
        }
      }, 
      error => {
        console.error(error);
      }
    )
  }

  getNotificationSpaceByRole() {
   
    if (this.authService.currentUserValue != null) {
      this.notifServe.getAllNotifications(this.authService.currentUserValue.id).subscribe(
      res => {
        res.forEach(notif => {
          notif.isView = true;
          this.notifServe.editNotification(notif).subscribe()
          this.getTotalNotifications();
        }); 
      },error => { console.log(error);
      }
    )
    }
      this.router.navigateByUrl("/espace-client/mes-notifications");
   
  }

  logout() {
    this.userService.setAvailable(0, this.authService.currentUserValue.id).subscribe(
      res => {console.log(res);
      }
    );
    this.authService.logout("client");
  }
}
  