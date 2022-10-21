import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role } from 'src/app/models/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
httpOptions = { 
    headers: new HttpHeaders({
    'Content-Type': 'application/json'
    })
  }

  apiUrl : string = "/api/jmlessous-ebanking/roles/";

  constructor(private http:HttpClient) { }

  getRole(id:any):Observable<Role>{
    return this.http.get<any>(this.apiUrl + "find/" + id);
  }

  getAllRolesRH():Observable<Role[]>{
    return this.http.get<any>(this.apiUrl + "find-all-for-rh");
  }

  getAllRolesDIrectoire():Observable<Role[]>{
    return this.http.get<any>(this.apiUrl + "find-all-for-directoire");
  }
}
