import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  search: String = "";
  isAdmin = false;
  isClientManager = false;
  isSuperAdmin = false;
  isPersonnalManager = false;

  constructor(private authService:AuthenticationService,private router : Router) { }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.isClientManager = this.authService.isClientManager();
    this.isSuperAdmin = this.authService.isSuperAdmin();
    this.isPersonnalManager = this.authService.isPersonnalManager();
  }

  activeItemMenus(itemName: String, urlPosition: any) {
    return this.router.url.split('/')[urlPosition] == itemName ? true : false;
  }
}