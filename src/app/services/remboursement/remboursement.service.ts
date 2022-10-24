import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaiementCredit } from 'src/app/models/paiementCredit';

@Injectable({
  providedIn: 'root'
})
export class RemboursementService {

httpOptions = { 
    headers: new HttpHeaders({
    'Content-Type': 'application/json'
    })
  }

  apiUrl : string = "/api/jmlessous-ebanking/credit-paiements/";

  constructor(private http:HttpClient) { }

  getAllPaiements():Observable<PaiementCredit>{
    return this.http.get<any>(this.apiUrl + "find-all");
  }
}
