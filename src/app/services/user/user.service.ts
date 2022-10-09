import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/user';
import { SignupRequest } from 'src/app/utils/signupRequest';
import { ValidationRequest } from '../../utils/validationRequest';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  httpOptions = { 
    headers: new HttpHeaders({
    'Content-Type': 'application/json'
    })
  }

  apiUrl : string = "/api/jmlessous-ebanking/users/";

  constructor(private http:HttpClient) { }

  changePassword(user:SignupRequest,id:any):Observable<User>{
    return this.http.put<User>(this.apiUrl+"change-password/"+id,user)
  }

  addUser(user:User): Observable<any>{
    return this.http.post<User>(this.apiUrl + "add", user);
  }

  getUserRole(roleName:any): Observable<Role>{
    return this.http.get<Role>(this.apiUrl + "get-role-by-name/"+roleName);
  }
  
  getUser(id:any) :Observable<User>{
    return this.http.get<User>(this.apiUrl+"get-user/"+id);
  }
  
  getProfile(filename:any) :Observable<any>{
    return this.http.get<any>(this.apiUrl+"get-profile/"+filename);
  }
  
  getAllUsers():Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl+"list-all");
  }

  getAllClients():Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl+"list-all-clients");
  }

  getAllPersonnals():Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl+"list-all-personnals");
  }

  editUser(user: User): Observable<any>{
    return this.http.put<User>(this.apiUrl+"edit-user",user);
  }
}
