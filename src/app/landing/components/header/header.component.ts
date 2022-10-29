import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';

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
  constructor(private authService: AuthenticationService,
    private userService: UserService,private router:Router) { }

  ngOnInit(): void {
    
    if (this.authService.currentUserValue && this.authService.currentUserValue.roles[0] == "ROLE_CLIENT") {
      this.logged = true;
      this.getUser(this.authService.currentUserValue.id);
    } else {
      this.logged = false;
    }
    
  }

  getUser(id:any) {
    this.userService.getUser(id).subscribe(
      res => {
        if (res.role.name == "ROLE_CLIENT") {
          this.user = res; 
          
          this.userService.getProfile(this.user.profile).subscribe(
          res => {
            this.profileLoaded = true;
            this.user.profileUrl = res.message;
          },error => {console.error(error)}
        )
        }
      }, 
      error => {
        console.error(error);
      }
    )
  }

  getNotificationSpaceByRole() {
   
      this.router.navigateByUrl("/espace-client/mes-notifications");
   
  }

  logout() {
    this.authService.logout("client");
  }
}
  