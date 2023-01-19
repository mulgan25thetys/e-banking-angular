import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

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
