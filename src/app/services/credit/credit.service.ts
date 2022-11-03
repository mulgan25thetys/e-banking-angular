import { HttpClient, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
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

  addCreditImmo(credit: Credit,idUser:any): Observable<any> {
    return this.http.post<Credit>(this.apiUrl + "add-credit-immo/"+idUser, credit);
  }

  AddCreditToCard(credit: Credit, idUser: any, numeroCarte: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + "add-credit-to-card/" + idUser + "/" + numeroCarte, credit);
  }

  useCreditInCard(credit: Credit, idUser: any, numeroCarte: any): Observable<any> {
    return this.http.put<any>(this.apiUrl + "use-credit-in-card/" + idUser + "/" + numeroCarte, credit);
  }

  rembourserCrdit(idUser: any, numeroCarte: any, idCredit: any, idpai: any): Observable<any> {
    return this.http.put<any>(this.apiUrl + "rembourser-credit-by-user-by-card/" + idUser + "/" + idCredit + "/" + idpai + "/" + numeroCarte, '');
  }

  findEmprunteur(idCredit:any) :Observable<any>{
   return this.http.get<any>(this.apiUrl + "find-emprunteur/" + idCredit);
  }

  accordCreditimmo(idCredit:any):Observable<any> {
    return this.http.put<any>(this.apiUrl + "accorde-credit-immo/" + idCredit, '');
  }

  upload(file: File,id:any): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('PUT', `${this.apiUrl}upload/`+id, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  getFiles(filename:String): Observable<any> {
     //return this.http.get(`${this.baseApiUrlFile}profiles/` + filename);
     return this.http.get<any>(`${this.apiUrl}files/` + filename);
  }
}