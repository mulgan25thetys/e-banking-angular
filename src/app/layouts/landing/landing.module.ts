import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { HomeComponent } from './home/home.component';
import { AdminModule } from '../admin/admin.module';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    LandingComponent,
    HomeComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    AdminModule,
    FormsModule,
    Ng2SearchPipeModule,
    MatPaginatorModule,
  ],
})
export class LandingModule { }
