import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssuranceRoutingModule } from './assurance-routing.module';
import { AssuranceComponent } from './assurance.component';


@NgModule({
  declarations: [
    AssuranceComponent
  ],
  imports: [
    CommonModule,
    AssuranceRoutingModule
  ]
})
export class AssuranceModule { }
