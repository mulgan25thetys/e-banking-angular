import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { SignupRequest } from '../utils/signupRequest';
import { ValidationRequest } from '../utils/validationRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

    apiUrl : string = environment.apiURL+"/jmlessous-ebanking/auth/";

  private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient,private router: Router) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }
 
    login(username: string, password: string) {
      
        return this.http.post<any>(this.apiUrl+'login', { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    } 

    confirm() {
        this.router.navigate(['/auth/se-connecter']);
    }

  isClient() {
        let isClient = false;
        for (let i = 0; i < this.currentUserValue?.roles.length; i++) {
            if (this.currentUserValue.roles[i] === "ROLE_CLIENT") {
                isClient = true;
            }
        }
        return isClient;
  }
  isSuperAdmin() {
        let isSuperAdmin = false;
        for (let i = 0; i < this.currentUserValue?.roles.length; i++) {
            if (this.currentUserValue.roles[i] === "ROLE_MEMBRE_DIRECTOIRE") {
                isSuperAdmin = true;
            }
        }
        return isSuperAdmin;
  }

  isClientManager() {
        let manager = false;
        for (let i = 0; i < this.currentUserValue?.roles.length; i++) {
            if (this.currentUserValue.roles[i] === "ROLE_GESTIONNAIRE_CLIENTELE"
              || this.currentUserValue.roles[i] === "ROLE_CONSEILLER_CLIENTELE"
              || this.currentUserValue.roles[i] === "ROLE_GESTIONNAIRE_PATRIMOINE") {
                manager = true;
            }
        }
        return manager;
  }
  isPersonnalManager() {
        let manager = false;
        for (let i = 0; i < this.currentUserValue?.roles.length; i++) {
            if (this.currentUserValue.roles[i] === "ROLE_PERSONNEL_RH") {
                manager = true;
            }
        }
        return manager;
  }
   
  isAdmin() {
      let isAdmin = false;
      
      for (let i = 0; i < this.currentUserValue?.roles.length; i++) {
          if (   this.currentUserValue.roles[i] === "ROLE_MEMBRE_DIRECTOIRE"
              || this.currentUserValue.roles[i] === "ROLE_GESTIONNAIRE_CLIENTELE"
              || this.currentUserValue.roles[i] === "ROLE_CONSEILLER_CLIENTELE"
              || this.currentUserValue.roles[i] === "ROLE_DECIDEUR"
              || this.currentUserValue.roles[i] === "ROLE_PERSONNEL_RH"
              || this.currentUserValue.roles[i] === "ROLE_DIRECTEUR_FINANCIER"
              || this.currentUserValue.roles[i] === "ROLE_GESTIONNAIRE_PATRIMOINE"
              || this.currentUserValue.roles[i] === "ROLE_CONTROLEUR_GESTION"
              || this.currentUserValue.roles[i] === "ROLE_CHARGE_ETUDE"
              || this.currentUserValue.roles[i] === "ROLE_EMPLOYE_CAP") {
              isAdmin = true;
          }
      }
      return isAdmin;
  }

  updateCurrentUSerAccount(user:User){
      localStorage.setItem('currentUser', JSON.stringify(user));
      return user;
  }

  setAvailable(code:any,idUser:any): Observable<any>{
    return this.http.put<any>(this.apiUrl+"set-is-available/"+code+"/"+idUser,'');
  }

  register(user :SignupRequest): Observable<any>{
    return this.http.post<SignupRequest>(this.apiUrl+"register",user);
  }

  confirmAccount(): Observable<any>{
    return this.http.get<any>(this.apiUrl+"confirm");
  }

  forgotPassword(user:User): Observable<any>{
    return this.http.post<User>(this.apiUrl+"forgot-password",user)
  }

  validCode(validationRequest:ValidationRequest): Observable<any>{
    return this.http.put<User>(this.apiUrl+"code-validation",validationRequest,)
  }

  resetPassword(user:User): Observable<any>{
    return this.http.put<User>(this.apiUrl+"reset-password",user)
  }
    
  logout(type:any) {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
     
    if (type == "admin") {
      this.router.navigate(['/auth/se-connecter']);
    } else {
      this.router.navigate(['/accueil']);
    }
    location.reload();
  }
}