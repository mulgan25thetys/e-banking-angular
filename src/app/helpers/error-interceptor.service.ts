import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {
  
  constructor(private authenticationService: AuthenticationService,private router:Router,private toastr:ToastrService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
          
          if ([401, 403].indexOf(err.status) !== -1) {
            // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
            //this.authenticationService.logout(true);
          }

          if ([500].indexOf(err.status) !== -1) {
           // this.router.navigateByUrl('/internal-server-error');
            this.toastr.warning("Une erreur interne du serveur s'est produite", "Internal server error");
          }

          if ([504].indexOf(err.status) !== -1) {
            if (this.authenticationService.currentUserValue) {
              localStorage.removeItem('currentUser');

              this.authenticationService.currentUser = null; 
              location.reload();
              this.router.navigateByUrl('/accueil');
            }
          }

            const error = err.error?.message || err.statusText;
            return throwError(error);
        }))
    }
}
