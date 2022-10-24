import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReseauspaiementService {
httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  apiUrl: string = "/api/jmlessous-ebanking/reseau-paiements/";

  constructor(private http: HttpClient) { }

  find(idReseau:any): Observable<any> {
    return this.http.get<any>(this.apiUrl + "find/"+idReseau);
  }
}
