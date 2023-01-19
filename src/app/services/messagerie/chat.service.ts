import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Chat } from 'src/app/models/chat';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  httpOptions = { 
    headers: new HttpHeaders({
    'Content-Type': 'application/json'
    })
  }

  apiUrl : string = "/api/jmlessous-ebanking/chats/";

  constructor(private http: HttpClient) { }
  
  findAll(uniqueId:any): Observable<Chat[]>{
    return this.http.get<Chat[]>(this.apiUrl+"get-user-message/"+uniqueId);
  } 

  addMessage(chatObject: Chat): Observable<any> {
    return this.http.post<Chat>(this.apiUrl+"add-user-message",chatObject);
  }
}
 