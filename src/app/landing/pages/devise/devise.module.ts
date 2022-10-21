import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeviseRoutingModule } from './devise-routing.module';
import { DeviseComponent } from './devise.component';


@NgModule({
  declarations: [
    DeviseComponent
  ],
  imports: [
    CommonModule,
    DeviseRoutingModule
  ]
})
export class DeviseModule { }
