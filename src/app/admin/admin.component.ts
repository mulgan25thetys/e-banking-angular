import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  agentIsAvailable: Boolean = false;
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.checkIdAgentIsAvailable();
  }

  checkIdAgentIsAvailable() {
    this.userService.getAvailableAgent().subscribe(
      res => {
        if (res !=null) {
          this.agentIsAvailable = true;
        }
      }
    )
  }
}
