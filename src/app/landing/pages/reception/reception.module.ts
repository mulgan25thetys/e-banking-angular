import { NgApexchartsModule } from 'ng-apexcharts';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceptionRoutingModule } from './reception-routing.module';
import { ReceptionComponent } from './reception.component';
import { CreditComponent } from './credit/credit.component';
import { ChequeComponent } from './cheque/cheque.component';
import { FormsModule } from '@angular/forms';
import { NgxSliderModule } from '@angular-slider/ngx-slider';



@NgModule({
  declarations: [
    ReceptionComponent,
    CreditComponent,
    ChequeComponent
  ],
  imports: [
    CommonModule,
    ReceptionRoutingModule,
    FormsModule,
    NgApexchartsModule,
    NgxSliderModule,
  ]
})
export class ReceptionModule { }
