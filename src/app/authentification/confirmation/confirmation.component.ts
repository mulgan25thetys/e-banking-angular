import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  constructor(private authenticationService:AuthenticationService,private router:Router) { }

  ngOnInit(): void {
    this.authenticationService.confirmAccount().subscribe(
      res => {
        this.router.navigate(['/auth/se-connecter']);
      },
      error => {
        alert(error.message);
        this.router.navigate(['/auth/se-connecter']);
      }
    );
  }
}
