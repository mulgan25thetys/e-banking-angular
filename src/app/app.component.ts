import { Component, OnInit } from '@angular/core';
import { NotificationModel } from './models/notification';
import { NotificationService } from './services/notification/notification.service';
import { AuthenticationService } from './services/authentication.service';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent  {
  title = 'e-banking';

  content = '';
  notifications : NotificationModel[] = [];


  constructor(private notifiServe:NotificationService,private auth:AuthenticationService) {
    document.addEventListener('DOMContentLoaded',function(){
      $("#notifyButton").click();

    })
  }

  setNotification() {
    if(! ('Notification' in window) ){
            console.log('Web Notification not supported');
            return;
    }   

    if (this.auth.currentUserValue != null) {
       this.notifiServe.getAllNoShowedNotifications(this.auth.currentUserValue.id).subscribe(
      res => {
        if (res.length > 0) {
          res.forEach(notif => {
              Notification.requestPermission(this.sendNotification(notif));
          });
        } else {
          console.log("No notification!");
          
        }
      }
    )
   }
  }

  sendNotification(notification: any) :NotificationPermissionCallback {
    var object = new Notification(notification.object,{body:notification.message,icon:'../assets/images/notification.png', dir:'auto'});
      setTimeout(function(){
          object.close();
      }, 10000);
    notification.isShowed = true;
    this.notifiServe.editNotification(notification).subscribe();
    return null;
  }
 
  scrollUp() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

}
