import { ClientSpaceModule } from './../client-space/client-space.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LandingModule } from '../landing/landing.module';
import { AdminheaderComponent } from './components/adminheader/adminheader.component';
import { NotificationComponent } from './notification/notification.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    AdminheaderComponent,
    NotificationComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ClientSpaceModule,
    LandingModule,
    NgApexchartsModule,
    NgbModule,
    NgxPaginationModule
  ]
})
export class AdminModule { }
