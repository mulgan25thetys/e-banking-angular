import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/messagerie/chat.service';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AuthenticationService } from '../../../services/authentication.service';
import { UserService } from 'src/app/services/user/user.service';
import { CookieService } from 'src/app/services/cookie.service';
import { Chat } from 'src/app/models/chat';
declare var $: any;


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  chatMessage= new Chat();
  chats: Chat[] = [];

  user = new User();
  connected: Boolean = false;
  isAdmin: Boolean = false;
  isClient: Boolean = false;
  senderID: any;

  constructor(private chatServe: ChatService,private userService:UserService,
    private auth: AuthenticationService,private cookieServe:CookieService) { }
  
  ngOnInit(): void {
    

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

    this.userService.getUser(this.auth.currentUserValue.id).subscribe(
      res => {
        this.user = res;
      }
    )

    this.getMessages();
    // setInterval(this.getMessages, 200);
  }
  

  sendMessage() {
    if (this.auth.currentUserValue != null) {
      this.userService.getAvailableAgent().subscribe(
        res => {
          this.chatMessage.outgoingId = res.uniqueId;
          this.chatMessage.incomeId = this.auth.currentUserValue.uniqueId;
          this.chatServe.addMessage(this.chatMessage).subscribe(
            res => {
              this.ngOnInit();
            }, error => {
              console.log(error);
            
            }
          )
        }
      ) 
    }
  }

  getMessages() {
    
    if (this.auth.currentUserValue != null) {
        this.chatServe.findAll(this.auth.currentUserValue.uniqueId).subscribe(
        res => {
          this.chats = res;
        }
      )
    }
    
  }
}