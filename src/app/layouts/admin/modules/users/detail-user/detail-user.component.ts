import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit {

  @Input() user = new User();
  constructor() { }

  ngOnInit(): void {
  }

  getProfileUrl(value:any) {
    return 'url('+value+')';
  }
}
