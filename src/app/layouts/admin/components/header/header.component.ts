import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user/user.service';
import { MessageResponse } from '../../../../utils/messageResponse';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  logged = false;
  user = new User();
  profileLoaded = false;
  id: any;
  constructor(private authService:AuthenticationService,private userService:UserService) { }

  ngOnInit(): void {
    if (this.authService.currentUserValue) {
      this.logged = true;
      this.getUser(this.authService.currentUserValue.id);
    } else {
      this.logged = false;
    }
    
  }

  getUser(id:any) {
    this.userService.getUser(id).subscribe(
      res => {
        this.user = res;
        this.userService.getProfile(this.user.profile).subscribe(
          res => {
            this.profileLoaded = true;
            this.user.profileUrl = res.message;
          },error => {console.error(error)}
        )
      }, 
      error => {
        console.error(error);
      }
    )
  }

  logout() {
    this.authService.logout();
  }
}
