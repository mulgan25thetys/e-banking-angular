import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadeService {
  baseApiUrl = "/api/jmlessous-ebanking/users/";
  baseApiUrlFile = "/api/jmlessous-ebanking/joints/";

  constructor(private http: HttpClient) { }
  
  upload(file: File,id:any): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('profile', file);
    const req = new HttpRequest('PUT', `${this.baseApiUrl}edit-profile/`+id, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  getFiles(filename: any): Observable<any> {
    
    return this.http.get<any>(this.baseApiUrlFile+'files/'+filename);
  }

  // getProFiles(filename: any): Observable<any> {
  //   const req = new HttpRequest('GET', `${this.baseApiUrlFile}profiles/`+filename, {
  //     header: 'Content-Type: application/json',
  //     responseType: 'json'
  //   });
  //   return this.http.request(req);
  //   //return this.http.get<any>(`${this.baseApiUrlFile}profiles/`+filename,{header: {'Content-Type: application/json'}});
  // }

   getProFiles(filename:String): Observable<any> {
     //return this.http.get(`${this.baseApiUrlFile}profiles/` + filename);
     return this.http.get<any>(`${this.baseApiUrlFile}profiles/` + filename);
  }
}
