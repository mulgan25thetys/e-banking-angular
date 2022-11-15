import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  apiUrl: string = "/api/jmlessous-ebanking/stats/";

  constructor(private http: HttpClient) { }

  getChiffreAffaireByCredits(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "get-chiffre-affaire-by-credit");
  }
}
 