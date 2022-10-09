import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  constructor(private router: Router,private dataService:DataService) { }

  ngOnInit(): void {
  }

  getTitle() {
    return this.router.url.split("/")[2] == "interfaces" ? this.router.url.split("/")[2].toLocaleUpperCase() + "/" + this.router.url.split("/")[3].toLocaleUpperCase() : this.router.url.split("/")[2].toLocaleUpperCase();
  }
  getPreTitle() {
    return this.router.url.split("/")[2].toLocaleUpperCase();
  }
  getEntity() {
    if (this.router.url.split("/")[3]) {
      const str = this.router.url.split("/")[3];
      const index = str.length - 1;

      if (str[index] === 's' && str != "criteria-evaluations") {
        return str.substring(0, str.length - 1);
      } else {
        return str;
      }
    }
    return '';
  }

  displayBtn() {
    if (this.router.url.split("/")[2] == "dashboard") {
      return false;
    } else if(this.router.url.split("/")[3] == "projects-to-be-confirmed") {
      return false;
    }else {
      return true;
    }
  }

  getSearchValue(value: any) {
    this.dataService.updateData(value);
  }
}
