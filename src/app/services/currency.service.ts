import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  apiUrl: string = "https://xecdapi.xe.com/v1/convert_from.json/";

  constructor(private http: HttpClient) { }

  convert(from:any,to:any,amount:any): Observable<any> {
    return this.http.get<any>(this.apiUrl + '?from='+from+'&to='+to+'&amount='+amount);
  }
}
 