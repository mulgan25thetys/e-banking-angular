import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  search: string = "";
  limit: any;
  totalUsers = 0;
  
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];

  users: User[] = [];

  userTableName: String;

  userRole: String;
  
  constructor(private userService: UserService,
    private toastr: ToastrService,
    private authService: AuthenticationService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.userRole = this.activatedRoute.snapshot.params.userRole;
    if (this.userRole) {
      
      this.getAllUsers();
    }
  }  

  getAllUsers() {
    switch (this.userRole) {
      case 'all':
        this.userTableName = "Users";
        this.userService.getAllUsers().subscribe(
          res => {
            this.totalUsers = res.length;
            this.users = res.reverse();
            this.users.forEach(user => {
              this.userService.getProfile(user.profile).subscribe(
                res => { user.profileUrl = res.message}
              )
            });
          },
          error => {
            this.toastr.error(error,"List Users");
          }
        )
          break;
      case 'personnals':
        this.userTableName = "Personnels";
            this.userService.getAllPersonnals().subscribe(
            res => {
              this.totalUsers = res.length;
              this.users = res.reverse();
              this.users.forEach(user => {
                this.userService.getProfile(user.profile).subscribe(
                  res => { user.profileUrl = res.message}
                )
              });
            },
            error => {
              this.toastr.error(error,"List Users");
            }
          )
          break;
      default:
        this.userTableName = "Clients";
        this.userService.getAllClients().subscribe(
            res => {
              this.totalUsers = res.length;
              this.users = res.reverse();
              this.users.forEach(user => {
                this.userService.getProfile(user.profile).subscribe(
                  res => { user.profileUrl = res.message}
                )
              });
            },
            error => {
              this.toastr.error(error,"List Users");
            }
            )
          break;
      }
    
  }


  onTableDataChange(event: any) {
    this.page = event;
    this.getAllUsers();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getAllUsers();
  }

  getEmitter(event: any) {
    if (event) {
      this.ngOnInit();
    }
  }
  
}
