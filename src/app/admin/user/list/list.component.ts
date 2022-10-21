import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { User } from '../../../models/user';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';

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

  isClientManager: boolean = false;
  isSuperAdmin: boolean = false;
  isPersonnalManager: boolean = false;

  users: User[] = [];
  tableName: String = "";
  constructor(private userService: UserService,
    private toastr: ToastrService, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.isClientManager = this.authService.isClientManager();
    this.isSuperAdmin = this.authService.isSuperAdmin();
    this.isPersonnalManager = this.authService.isPersonnalManager();

    if (this.isSuperAdmin) {
      this.getAllUsers();
      this.tableName = "Membre";
    } else if (this.isPersonnalManager) {
      this.getAllPersonnals();
      this.tableName = "Personnel";
    } else {
      this.getClients();
      this.tableName = "Client";
    }
  }

  getClients() {
    this.userService.getAllClients().subscribe(
      res => {
        this.users = res;
        
      }, error => {
        this.toastr.error(error, "Listes des clients");
      }
    )
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      res => {
        this.users = res.reverse();
    }, error => {
        this.toastr.error(error, "Liste des Utilisateurs");
      }
    )
  }

  getAllPersonnals() {
    this.userService.getAllPersonnals().subscribe(
      res => {
        this.users = res;
    }, error => {
        this.toastr.error(error, "Liste des Personnels");
      }
    )
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

  getEmitter(event:any) {
    if (event == "ajouté") {
      this.ngOnInit();
    }
  }
}
