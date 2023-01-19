import { HttpClientJsonpModule, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Error404Component } from './error404/error404.component';
import { ErrorInterceptorService } from './helpers/error-interceptor.service';
import { JwtInterceptor } from './helpers/jwt-interceptor.service';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { AgmCoreModule } from '@agm/core';
import { CurrencyConverterInterceptor } from './helpers/currency-converter-interceptor.service';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';


@NgModule({
  declarations: [
    AppComponent,
    Error404Component
  ],
  imports: [
    
    BrowserModule,
    AppRoutingModule, 
    SocialLoginModule,
    HttpClientModule,
    HttpClientJsonpModule,
    FormsModule, 
    NgxSliderModule,
    ToastrModule.forRoot(),
    AgmCoreModule.forRoot(
      {
        apiKey: 'AIzaSyChd-Z-kjZi6rp7JOiBU-g7xqxJ1kfhSgw'
      }
    ),
    NgxPaginationModule,
    BrowserAnimationsModule,
    NgHttpLoaderModule,
    NgApexchartsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
   
  ], 
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CurrencyConverterInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('565425314740-vch6qf9mmsb3cabq7qo2j2ph8gopa1in.apps.googleusercontent.com'),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
