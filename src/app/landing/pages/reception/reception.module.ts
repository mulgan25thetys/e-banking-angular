import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceptionRoutingModule } from './reception-routing.module';
import { ReceptionComponent } from './reception.component';
import { CreditComponent } from './credit/credit.component';
import { ChequeComponent } from './cheque/cheque.component';


@NgModule({
  declarations: [
    ReceptionComponent,
    CreditComponent,
    ChequeComponent
  ],
  imports: [
    CommonModule,
    ReceptionRoutingModule
  ]
})
export class ReceptionModule { }
