import { Component, OnInit } from '@angular/core';
import { NotificationModel } from 'src/app/models/notification';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];
  
  notifications: NotificationModel[] = [];
  noShowedNotifications: NotificationModel[] = [];

  constructor(private notificationServe: NotificationService, private auth: AuthenticationService) {
    
   }

  ngOnInit(): void {
    this.findAllByCurrentUSer();
    this.findAllNoShowedByCurrentUSer();
    
  }

  findAllByCurrentUSer() {
    this.notificationServe.getAllNotifications(this.auth.currentUserValue.id).subscribe(
      res => {
        this.notifications = res;
      },error => { console.log(error);
      }
    )
  }
  findAllNoShowedByCurrentUSer() {
    this.notificationServe.getAllNotifications(this.auth.currentUserValue.id).subscribe(
      res => {
        this.noShowedNotifications = res;

        if (this.noShowedNotifications.length > 0) {
          
        }
        
      },error => { console.log(error);
      }
    )
  }

  deleteNotification(id: number) {
    this.notificationServe.deleteNotification(id).subscribe(
      res => {
        this.ngOnInit();
      }, error => {
        this.ngOnInit();
      }
    )
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.findAllByCurrentUSer();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.findAllByCurrentUSer();
  }
}
