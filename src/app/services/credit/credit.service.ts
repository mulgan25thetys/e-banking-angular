import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Credit } from 'src/app/models/credit';

@Injectable({
  providedIn: 'root'
})
export class CreditService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  apiUrl: string = "/api/jmlessous-ebanking/credits/";

  constructor(private http: HttpClient) { }

  getAllCredits(): Observable<Credit[]> {
    return this.http.get<any>(this.apiUrl + "find-all");
  }

  getCredit(id: any): Observable<Credit> {
    return this.http.get<any>(this.apiUrl + "find/" + id);
  }

  getCreditPayment(id: any): Observable<Credit> {
    return this.http.get<any>(this.apiUrl + "get-paiements/" + id);
  }

  getCreditByUser(id: any): Observable<any> {
    return this.http.get<any>(this.apiUrl + "find-by-user/" + id);
  }

  getMensualityByUser(idUser: any): Observable<any> {
    return this.http.get<any>(this.apiUrl + "get-mensuality-by-user/" + idUser);
  }

  simulerCreditConso(credit: Credit): Observable<Credit> {
    return this.http.post<any>(this.apiUrl + "simulate-credit-conso", credit);
  }

  AddCreditToCard(credit: Credit, idUser: any, numeroCarte: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + "add-credit-to-card/" + idUser + "/" + numeroCarte, credit);
  }

  rembourserCrdit(idUser: any, numeroCarte: any, idCredit: any, idpai: any): Observable<any> {
    return this.http.put<any>(this.apiUrl + "rembourser-credit-by-user-by-card/" + idUser + "/" + idCredit + "/" + idpai + "/" + numeroCarte, '');
  }
}