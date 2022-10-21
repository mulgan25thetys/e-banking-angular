import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Role } from 'src/app/models/role';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-adminheader',
  templateUrl: './adminheader.component.html',
  styleUrls: ['./adminheader.component.css']
})
export class AdminheaderComponent implements OnInit {
  isClientManager: boolean = false;
  isSuperAdmin: boolean = false;
  isPersonnalManager: boolean = false;
  
  role = new Role();
  roleName: String;
  constructor(private authService:AuthenticationService,private router:Router) {
    
   }

  ngOnInit(): void {
   
    this.role = this.authService.currentUserValue.roles[0];
    
    this.roleName = JSON.stringify(this.role).replace('"', '').split('_')[1];
    if (JSON.stringify(this.role).split('_')[2] != "") {
      this.roleName += " "+ JSON.stringify(this.role).split('_')[2]
    }

    if (JSON.stringify(this.role).split('_')[3] != undefined) {
      this.roleName += " "+ JSON.stringify(this.role).split('_')[3];
    }
    

    this.isClientManager = this.authService.isClientManager();
    this.isSuperAdmin = this.authService.isSuperAdmin();
    this.isPersonnalManager = this.authService.isPersonnalManager();

    
  }

  logout() {
    this.authService.logout("admin");
  }
}
