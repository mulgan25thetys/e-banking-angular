import { StatsService } from '../../../services/stats.service';
import { HttpEventType, HttpResponse, HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CreditService } from 'src/app/services/credit/credit.service';
import { FileUploadeService } from 'src/app/services/file-uploade.service';
import { UserService } from 'src/app/services/user/user.service';
import { SignupRequest } from 'src/app/utils/signupRequest';
import { MoyenPaiementsService } from '../../../services/moyenPaiements/moyen-paiements.service';
import { CookieService } from '../../../services/cookie.service';
import { CurrencyService } from 'src/app/services/currency.service';
declare var $:any;

const getSymbolFromCurrency = require('currency-symbol-map');
@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {
  capital: number=0;
  currency: String="";

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  isUpLoadError = false;
  message = '';
  classAlert ="";
  fileInfos?: Observable<any>;

  profileIsLoaded = false;
  user = new User();
  constructor(private userService: UserService, private chiffreServe:StatsService,private http:HttpClient,
    private uploadService: FileUploadeService,private cookieServe:CookieService,
    private authService: AuthenticationService, private moyenPayServe: MoyenPaiementsService
  ,private currencyServe:CurrencyService) { }

  ngOnInit(): void {

    
    if (this.authService.isAdmin()) {
      if (this.cookieServe.getCookie("currency-to")) {
        this.currency = getSymbolFromCurrency(this.cookieServe.getCookie("currency-to"));
      } else {
        this.currency = getSymbolFromCurrency(this.cookieServe.getCookie("currency-ad"));
      }
      
    } else {
      this.currency = getSymbolFromCurrency(this.cookieServe.getCookie("currency"));
    }
    

    if (this.authService.isClient()) { 
       this.getProvionsByCards();
    } else{
      this.getChiffreAffaire();
    }
   

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
        this.capital = res;
        this.currencyServe.convert(this.cookieServe.getCookie("currency-ad"),this.cookieServe.getCookie("currency"),this.capital).subscribe(
          res => {
            this.capital = res.to[0].mid; 
          }
        )
      }
    )
  }

  getChiffreAffaire() {
    
    this.chiffreServe.getChiffreAffaireByCredits().subscribe(
      res => {
        this.capital = res;
 
        this.cookieServe.deleteCookie("currency-ad");
        this.cookieServe.setCookie({ 'name': "currency-ad", 'value': this.cookieServe.getCookie("currency-to") });
        this.currencyServe.convert(this.cookieServe.getCookie("currency-from"),this.cookieServe.getCookie("currency-to"),this.capital).subscribe(
          res => {
            console.log(res.to);
            
            this.capital = res.to[0].mid;
          }
        )
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
