import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  constructor(private http: HttpClient) { }
  
  getLocation():Observable<any> {
    return this.http.get<any>("http://api.ipapi.com/api/check?access_key=385b95c7470b89a94caf978800bdf452");
  }
}
 