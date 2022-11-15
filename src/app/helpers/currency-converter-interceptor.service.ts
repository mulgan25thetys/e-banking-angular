import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CurrencyConverterInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to api url
      const credentials = 'Basic ' + btoa('esprit644612392' + ':' + 'q65et6e3qmoco5ao3kcfsd1rpv');
        const isApiUrl = request.url.startsWith('https://xecdapi.xe.com/v1/convert_from.json');
        // console.log('la requete',request);
        if (isApiUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: credentials
                }
            });
        }

        return next.handle(request);
    }
}
 