import { Injectable } from "@angular/core";
import { WebsocketService } from "./websocket.service";
import {map, filter} from 'rxjs/operators';

const CHAT_URL = "ws://echo.websocket.org/";

export interface Message {
  author: string;
  message: string;
}

@Injectable()
export class ChatService {

  constructor(wsService: WebsocketService) {
    
  }
}