import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CongeRoutingModule } from './conge-routing.module';
import { CongeComponent } from './conge.component';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';


@NgModule({
  declarations: [
    CongeComponent,
    ListComponent,
    AddComponent
  ],
  imports: [
    CommonModule,
    CongeRoutingModule
  ]
})
export class CongeModule { }
