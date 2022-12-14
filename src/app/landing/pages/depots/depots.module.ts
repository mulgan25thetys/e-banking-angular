import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepotsRoutingModule } from './depots-routing.module';
import { DepotsComponent } from './depots.component';
import { CarteBancaireComponent } from './carte-bancaire/carte-bancaire.component';
import { DepotComponent } from './depot/depot.component';
import { PrelevementComponent } from './prelevement/prelevement.component';
import { CompteBancaireComponent } from './compte-bancaire/compte-bancaire.component';


@NgModule({
  declarations: [
    DepotsComponent,
    CarteBancaireComponent,
    DepotComponent,
    PrelevementComponent,
    CompteBancaireComponent
  ],
  imports: [
    CommonModule,
    DepotsRoutingModule
  ]
})
export class DepotsModule { }
