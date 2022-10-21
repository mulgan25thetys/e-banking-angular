import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarteBancaire } from 'src/app/models/carteBancaire';

@Injectable({
  providedIn: 'root'
})
export class MoyenPaiementsService {

 httpOptions = { 
    headers: new HttpHeaders({
    'Content-Type': 'application/json'
    })
  }

  apiUrlCardsBancaires : string = "/api/jmlessous-ebanking/carte-bancaires/";

  constructor(private http: HttpClient) { }
  
  findAll(): Observable<CarteBancaire[]>{
    return this.http.get<CarteBancaire[]>(this.apiUrlCardsBancaires+"find-all");
  } 

  findAllCardsB(): Observable<CarteBancaire[]>{
    return this.http.get<CarteBancaire[]>(this.apiUrlCardsBancaires+"find-non-subscribed-cards");
  } 

  souscrireCardsB(idC:any,idUs:any): Observable<any>{
    return this.http.put<any>(this.apiUrlCardsBancaires+"souscrire-carte-bancaire/"+idC+"/"+idUs,'');
  } 

  deSouscrireCardsB(idC:any,idUs:any): Observable<any>{
    return this.http.put<any>(this.apiUrlCardsBancaires+"annuler-souscrire-carte-bancaire/"+idC+"/"+idUs,'');
  } 

  getcardsByUser(idUser:any):Observable<CarteBancaire[]> {
    return this.http.get<CarteBancaire[]>(this.apiUrlCardsBancaires+"get-by-user/"+idUser);
  }

  addCardsBank(cards: CarteBancaire): Observable<any>{
    return this.http.post<CarteBancaire>(this.apiUrlCardsBancaires + "add", cards);
  }

  getcards(id:any):Observable<any> {
    return this.http.get<any>(this.apiUrlCardsBancaires+"find/"+id);
  }
}