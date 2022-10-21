import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartebancaireRoutingModule } from './cartebancaire-routing.module';
import { CartebancaireComponent } from './cartebancaire.component';
import { ListeComponent } from './liste/liste.component';
import { AddComponent } from './add/add.component';


@NgModule({
  declarations: [
    CartebancaireComponent,
    ListeComponent,
    AddComponent
  ],
  imports: [
    CommonModule,
    CartebancaireRoutingModule
  ]
})
export class CartebancaireModule { }
