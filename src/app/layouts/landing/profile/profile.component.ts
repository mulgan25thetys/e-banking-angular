import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { FileUploadeService } from 'src/app/services/file-uploade.service';
import { UserService } from 'src/app/services/user/user.service';
import { SignupRequest } from 'src/app/utils/signupRequest';
import { AuthenticationService } from '../../../services/authentication.service';
declare var $:any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  isUpLoadError = false;
  message = '';
  classAlert ="";
  fileInfos?: Observable<any>;

  profileIsLoaded = false;
  user = new User();

  userUpdate = new SignupRequest();
  constructor(private userService: UserService,
    private uploadService: FileUploadeService,
    private authService: AuthenticationService,
    ) { 
    
  }

  ngOnInit(): void {
    if (this.authService.currentUserValue) {
      this.getUser(this.authService.currentUserValue.id);
    }

    $('#modal-password').on('hide.bs.modal', function (e) {
      $("#ChangePasswordForm")[0].reset();
    })
  }

  getUser(id: any) {
    this.userService.getUser(id).subscribe(
      res => {
        this.user = res;
        this.userService.getProfile(this.user.profile).subscribe(
          res => {
            this.profileIsLoaded = true;
            this.user.profileUrl = res.message;
          },error => {console.error(error)}
        )
       
        //this.teamService.getTeamById(this.user.myTeam.i)
      }, error => {
        console.error(error);
      }
    )
  }

  editUser() {
    
    if (confirm("You will be logged out for this update!")) {
      this.userService.editUser(this.user).subscribe(
        res => {
          this.authService.logout(true);
        },
        error => {
          alert(error);
        }
      )
    }
  }

  showPassword() {
     
      if($(document).find("#password").attr('type') == "password" ) {
        $(document).find("#password").prop('type', "text");
        $(document).find("#confirmpassword").prop('type', "text");
        $(document).find("#showhide").html("hide password");
      } else {
        $(document).find("#password").prop('type', "password");
        $(document).find("#confirmpassword").prop('type', "password");
        $(document).find("#showhide").html("show password");
      }

  }

  onchangePassword(form:any) {
    this.userService.changePassword(this.userUpdate,this.user.id).subscribe(
      res => {
        form.reset();
        alert("Your password has been changed!");
        $("#modalClose").click();
        
        this.getUser(this.user.id);
      },
      error => {
        console.log(error);
      }
    )
  }
selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }
  upload(): void {
    this.progress = 0;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        if (file.type.split("/")[0] === "image") {
          this.uploadService.upload(this.currentFile,this.user.id).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.classAlert = "alert-success";
              // this.fileInfos = this.uploadService.getFiles();
              location.reload();
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;
            if (err.error && err.error.message) {
              this.message = err.error.message;
              this.classAlert = "alert-danger";
            } else {
              this.message = 'Could not upload the file!';
              this.classAlert = "alert-danger";
            }
            this.currentFile = undefined;
          });
        } else {
          this.isUpLoadError = true;
          this.message = 'Insert a Image file please!';
          this.classAlert = "alert-danger";
        }
        
      }
      this.selectedFiles = undefined;
    }
  }

  confirmPassword() {
    return this.userUpdate.password == this.userUpdate.confirmpassword;
  }
}
