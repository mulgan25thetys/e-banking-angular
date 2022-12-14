import { LandingModule } from './../landing/landing.module';
import { NgModule } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CommonModule } from '@angular/common';

import { ClientSpaceRoutingModule } from './client-space-routing.module';
import { ClientSpaceComponent } from './client-space.component';
import { ProfileComponent } from './profile/profile.component';
import { AsideComponent } from './components/aside/aside.component';
import { DepotsComponent } from './depots/depots.component';
import { CreditsComponent } from './credits/credits.component';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { NotificationComponent } from './notification/notification.component';


@NgModule({
  declarations: [
    ClientSpaceComponent,
    ProfileComponent,
    AsideComponent,
    DepotsComponent,
    CreditsComponent,
    NotificationComponent,
  ],
  imports: [
    CommonModule,
    ClientSpaceRoutingModule,
    LandingModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    NgApexchartsModule
  ],
  exports : [AsideComponent]
})
export class ClientSpaceModule { }
