import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/messagerie/chat.service';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AuthenticationService } from '../../../services/authentication.service';
import { UserService } from 'src/app/services/user/user.service';
import { CookieService } from 'src/app/services/cookie.service';
declare var $: any;


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  newMessage: String = "";
  messageSending: String[] = [];
  messageRecepient: String[] = [];
  
  user = new User();
  connected: Boolean = false;
  isAdmin: Boolean = false;
  isClient: Boolean = false;
  senderID: any;

  constructor(private chatServe: ChatService,private userService:UserService,
    private auth: AuthenticationService,private cookieServe:CookieService) { }
  
  ngOnInit(): void {
    this.user.messageRecepient = [];
    this.user.messageSending = [];

    this.messageSending= [];
    this.messageRecepient= [];
    

    this.senderID = this.cookieServe.getCookie("sender_id");

    this.isAdmin = this.auth.isAdmin();
    this.isClient = this.auth.isClient();
    $('#chat_converse').css('display', 'block');

    $('#prime').click(function() {
      $('.prime').toggleClass('zmdi-comment-outline');
      $('.prime').toggleClass('zmdi-close');
      $('.prime').toggleClass('is-active');
      $('.prime').toggleClass('is-visible');
      $('#prime').toggleClass('is-float');
      $('.chat').toggleClass('is-visible');
      $('.fab').toggleClass('is-visible');
    });

    this.chatServe.getNewMessage().subscribe((message: string) => {
      this.user.messageSending.push(message);
    })
  }

  sendMessage() {
    this.chatServe.sendMessage(this.newMessage);
    this.newMessage = '';
  }
}