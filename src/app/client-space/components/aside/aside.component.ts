import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FileUploadeService } from 'src/app/services/file-uploade.service';
import { UserService } from 'src/app/services/user/user.service';
import { SignupRequest } from 'src/app/utils/signupRequest';
import { MoyenPaiementsService } from '../../../services/moyenPaiements/moyen-paiements.service';
declare var $:any;

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {
  provisions: any;

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  isUpLoadError = false;
  message = '';
  classAlert ="";
  fileInfos?: Observable<any>;

  profileIsLoaded = false;
  user = new User();
  constructor(private userService: UserService,
    private uploadService: FileUploadeService,
    private authService: AuthenticationService,private moyenPayServe:MoyenPaiementsService) { }

  ngOnInit(): void {

    this.getProvionsByCards();

    if (this.authService.currentUserValue) {
      this.getUser(this.authService.currentUserValue.id);
    }

    $('#modal-password').on('hide.bs.modal', function (e) {
      $("#ChangePasswordForm")[0].reset();
    })
  }

  getProvionsByCards() {
    this.moyenPayServe.getProvisions(this.authService.currentUserValue.id).subscribe(
      res => {
        this.provisions = res;
      }
    )
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
} 
