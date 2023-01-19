import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarteBancaire } from 'src/app/models/carteBancaire';
import { ReseauPaiement } from 'src/app/models/reseauPaiement';
import { Devises } from '../../models/devises';

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

  getCreditByNumber(numero:String,idUser: any): Observable<any> {
    return this.http.get<any>(this.apiUrlCardsBancaires + "get-by-number/" +numero+"/"+ idUser);
  }

  getDevises(): Observable<Devises[]> {
    return this.http.get<any>(this.apiUrlCardsBancaires + "find-devises");
  }
  getReseauxPay(): Observable<ReseauPaiement[]> {
    return this.http.get<any>(this.apiUrlCardsBancaires + "find-reseau-paiements");
  }
  getProvisions(idUser:any): Observable<any> {
    return this.http.get<any>(this.apiUrlCardsBancaires + "get-total-provisions/"+idUser);
  }

  getQuickCardNumber(idUser:any): Observable<any> {
    return this.http.get<any>(this.apiUrlCardsBancaires + "get-card-number/"+idUser);
  }

  TransfertCardToCard(idUser:any,cardDeb:any,cardCred:any,montant:any): Observable<any> {
    return this.http.put<any>(this.apiUrlCardsBancaires + "transfert-card-to-card/"+idUser+"/"+cardDeb+"/"+cardCred+"/"+montant,'');
  }

  delete(idCard:any): Observable<any> {
    return this.http.delete<any>(this.apiUrlCardsBancaires + "delete/"+idCard);
  }
}