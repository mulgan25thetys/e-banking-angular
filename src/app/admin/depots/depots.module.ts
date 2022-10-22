import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepotsRoutingModule } from './depots-routing.module';
import { DepotsComponent } from './depots.component';
import { ListeComponent } from './liste/liste.component';
import { AddComponent } from './add/add.component';


@NgModule({
  declarations: [
    DepotsComponent,
    ListeComponent,
    AddComponent
  ],
  imports: [
    CommonModule,
    DepotsRoutingModule
  ]
})
export class DepotsModule { }
