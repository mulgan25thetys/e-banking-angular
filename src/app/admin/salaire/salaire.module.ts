import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalaireRoutingModule } from './salaire-routing.module';
import { SalaireComponent } from './salaire.component';


@NgModule({
  declarations: [
    SalaireComponent
  ],
  imports: [
    CommonModule,
    SalaireRoutingModule
  ]
})
export class SalaireModule { }
