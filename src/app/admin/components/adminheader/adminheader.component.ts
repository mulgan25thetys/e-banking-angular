import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Role } from 'src/app/models/role';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CookieService } from 'src/app/services/cookie.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-adminheader',
  templateUrl: './adminheader.component.html',
  styleUrls: ['./adminheader.component.css']
})
export class AdminheaderComponent implements OnInit {
  isClientManager: boolean = false;
  isSuperAdmin: boolean = false;
  isPersonnalManager: boolean = false;
  
  role = new Role();
  roleName: String;

  totalNoViewNotifications: number = 0;
  isThisCurrency: String ="EUR";
  constructor(private authService: AuthenticationService, private router: Router,
  private notifServe:NotificationService,private cookieServe:CookieService) {
    
   }

  ngOnInit(): void {
    if (this.cookieServe.getCookie("currency-ad") && this.cookieServe.getCookie("currency-to")) {
      (<HTMLSelectElement>document.getElementById('current_currency')).value = this.cookieServe.getCookie("currency-to");
      this.cookieServe.setCookie({ 'name': "currency-from", 'value': this.cookieServe.getCookie("currency-ad") });
    } else {
        let currency = (<HTMLSelectElement>document.getElementById('current_currency')).value;
      this.cookieServe.setCookie({ 'name': "currency-ad", 'value': currency });
      this.cookieServe.setCookie({ 'name': "currency-from", 'value': this.cookieServe.getCookie("currency-ad") });
    }

    this.getTotalNotificationsNoView();
    
    this.role = this.authService.currentUserValue.roles[0];
    
    this.roleName = JSON.stringify(this.role).replace('"', '').split('_')[1];
    if (JSON.stringify(this.role).split('_')[2] != "") {
      this.roleName += " "+ JSON.stringify(this.role).split('_')[2]
    }

    if (JSON.stringify(this.role).split('_')[3] != undefined) {
      this.roleName += " "+ JSON.stringify(this.role).split('_')[3];
    }
    

    this.isClientManager = this.authService.isClientManager();
    this.isSuperAdmin = this.authService.isSuperAdmin();
    this.isPersonnalManager = this.authService.isPersonnalManager();

    
  }

  getUpdateCurrency() {
    let currency = (<HTMLSelectElement>document.getElementById('current_currency')).value;
    //this.cookieServe.deleteCookie("currency-ad");
    this.cookieServe.setCookie({ 'name': "currency-to", 'value': currency });
    window.location.reload();    
  }

  getTotalNotificationsNoView() {
    this.notifServe.getAllNoViewNotifications(this.authService.currentUserValue.id).subscribe(
      res => {
        this.totalNoViewNotifications = res.length;
      }
    )
  }
  getNotificationSpaceByRole() {
      this.notifServe.getAllNotifications(this.authService.currentUserValue.id).subscribe(
      res => {
        res.forEach(notif => {
          notif.isView = true;
          this.notifServe.editNotification(notif).subscribe()
          this.getTotalNotificationsNoView();
        });
      },error => { console.log(error);
      }
    )
      this.router.navigateByUrl("/admin/notifications");
    
  }

  logout() {
    this.authService.logout("admin");
  }
}
 