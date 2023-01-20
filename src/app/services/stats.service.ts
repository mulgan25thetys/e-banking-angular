import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  apiUrl: string = environment.apiURL+"/jmlessous-ebanking/stats/";

  constructor(private http: HttpClient) { }

  getChiffreAffaireByCredits(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "get-chiffre-affaire-by-credit");
  }
}
 