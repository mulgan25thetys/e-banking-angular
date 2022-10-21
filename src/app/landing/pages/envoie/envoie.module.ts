import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnvoieRoutingModule } from './envoie-routing.module';
import { EnvoieComponent } from './envoie.component';


@NgModule({
  declarations: [
    EnvoieComponent
  ],
  imports: [
    CommonModule,
    EnvoieRoutingModule
  ]
})
export class EnvoieModule { }
