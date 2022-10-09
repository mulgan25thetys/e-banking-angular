import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  title: String = "";

  displayActionBtn: boolean = false;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  getTitle() {
    return this.router.url.split("/")[1].split("?")[0].toLocaleUpperCase();
  }
  getPreTitle() {
    return this.router.url.split("/")[1].toLocaleUpperCase();
  }

  getEntity() {
    return "project";
  }
}
