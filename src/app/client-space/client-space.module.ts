import { LandingModule } from './../landing/landing.module';
import { NgModule } from '@angular/core';
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


@NgModule({
  declarations: [
    ClientSpaceComponent,
    ProfileComponent,
    AsideComponent,
    DepotsComponent,
    CreditsComponent,
  ],
  imports: [
    CommonModule,
    ClientSpaceRoutingModule,
    LandingModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule
  ],
  exports : [AsideComponent]
})
export class ClientSpaceModule { }
