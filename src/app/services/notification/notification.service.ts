import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationModel } from 'src/app/models/notification';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  apiUrl: string = "/api/jmlessous-ebanking/notifications/";

  constructor(private http: HttpClient) { }

  getAllNotifications(idUser:any): Observable<NotificationModel[]> {
    return this.http.get<any>(this.apiUrl + "find-all/"+idUser);
  }
  getAllNoShowedNotifications(idUser:any): Observable<NotificationModel[]> {
    return this.http.get<any>(this.apiUrl + "find-all-no-showed/"+idUser);
  }

  getAllNoViewNotifications(idUser:any): Observable<NotificationModel[]> {
    return this.http.get<any>(this.apiUrl + "find-all-no-view/"+idUser);
  }

  editNotification(notification:any): Observable<any> {
    return this.http.put<any>(this.apiUrl + "edit-notification",notification);
  }
  deleteNotification(id:any): Observable<any> {
    return this.http.delete<any>(this.apiUrl + "delete/"+id);
  }
}
