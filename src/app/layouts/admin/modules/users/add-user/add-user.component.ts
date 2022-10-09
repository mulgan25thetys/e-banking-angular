import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user/user.service';
import { User } from '../../../../../models/user';
import { NgForm } from '@angular/forms';
import { filter } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
}) 
export class AddUserComponent implements OnInit {

  isClientManager = false;
  isSuperAdmin = false;
  isPersonnalManager = false;

  loaded: Boolean = false;

  userRole: any;

  @Output() emitter = new EventEmitter<any>();

  user = new User();

  constructor(private userServcice: UserService,private authService:AuthenticationService, private authservice: AuthenticationService, private toastr: ToastrService) {
    
   }

  ngOnInit(): void {
    this.isClientManager = this.authService.isClientManager();
    this.isSuperAdmin = this.authService.isSuperAdmin();
    this.isPersonnalManager = this.authService.isPersonnalManager();

    this.user.roles = [];
    $("#users").on("hide.bs.modal", function (e) {
      $("#formUser")[0].reset();
    })
  }

  saveUser(form: any) {
    this.loaded = true;
    $("#submitBtn").prop('disabled', true);

    if (this.userRole != null) {
      this.userServcice.getUserRole(this.userRole).subscribe(
        res => {
          this.user.role = res;
          console.log(this.user);
          this.userServcice.addUser(this.user).subscribe(
           res => {
            this.toastr.success("User "+this.user.username+" added successfully!", "Add User");
              this.emitter.emit(true);
              this.loaded = false;
              $("#submitBtn").prop('disabled', false);
              $("#closeModal").click();
          }, 
            error => {
              this.loaded = false;
              $("#submitBtn").prop('disabled', false);
           this.toastr.error(error, "Add User");
          }
      )
        }
      )
    } else {
      this.loaded = false;
      $("#submitBtn").prop('disabled', false);
      this.toastr.warning("Please select least one role", "Add user");
    }
  }

  resetForm(form: NgForm) {
    this.user = new User();
    this.userRole = null;
    form.reset();
  }

  debug(value:any) {
    console.log(value);
  }
}