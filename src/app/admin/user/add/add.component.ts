import { User } from './../../../models/user';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Role } from 'src/app/models/role';
import { AuthenticationService } from '../../../services/authentication.service';
import { UserService } from 'src/app/services/user/user.service';
import { RoleService } from 'src/app/services/role/role.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  loader: Boolean = false;
  @Output() emitter = new EventEmitter();

  isLoaded: Boolean = false;
  roles: Role[] = [];
  user = new User();
  constructor(private auth: AuthenticationService, private userService: UserService
  ,private roleService:RoleService,private toastr:ToastrService) { }

  ngOnInit(): void {
    if (this.auth.isSuperAdmin()) {
      
      this.getAllRoleDirectoire();
    } else if(this.auth.isPersonnalManager()){
      this.getAllRoleRH();
    } else {
      this.roles.push({ "id": 1, "name": "CLIENT" });
    }
    
  }

  getAllRoleRH() {
    this.roleService.getAllRolesRH().subscribe(
      res => {
        this.roles = res;
        this.roles.forEach(role => {
          role.name = role.name.replace("ROLE_", " ");
          role.name = role.name.replace("_", " ");
        });
        
      }, error => {
        this.toastr.error(error, "Récupération des roles!");
      }
    )
  }

  getAllRoleDirectoire() {
    this.roleService.getAllRolesDIrectoire().subscribe(
      res => {
        this.roles = res;
        this.roles.forEach(role => {
          role.name = role.name.replace("ROLE_", " ");
          role.name = role.name.replace("_", " ");
        });
        
      }, error => {
        this.toastr.error(error, "Récupération des roles!");
      }
    )
  }

  ajouterUnPersonnel(form: NgForm) {
    this.isLoaded = true;
    let roleID = (<HTMLSelectElement>document.getElementById('input-fonction')).value;
    if (roleID != "default") {
      this.roleService.getRole(roleID).subscribe(
        res => {
          if (res.id == roleID) {
            this.user.role = res;
            this.userService.addUser(this.user).subscribe(
              res => {
                form.reset();
                this.emitter.emit("ajouté");
                this.isLoaded = false;
                $("#modalBtn").click();
              }, error => {
                this.toastr.error(error, "Ajout d'un personnel!");
                this.isLoaded = false;
              }
            )
          }
        }, () => {
          this.toastr.error("Impossible de recupérer la fonction de l'utilisateur", "Fonction de l'utilisateur");
          this.isLoaded = false;
         }
       )
    } else {
      this.toastr.warning("Si vous plait selectionner une fonction", "Fonction de l'utilisateur");
      this.isLoaded = false;
    }
    
  }

  closeModal() {
    
  }
}
