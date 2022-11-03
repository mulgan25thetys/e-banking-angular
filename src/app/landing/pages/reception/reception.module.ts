import { NgApexchartsModule } from 'ng-apexcharts';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceptionRoutingModule } from './reception-routing.module';
import { ReceptionComponent } from './reception.component';
import { CreditComponent } from './credit/credit.component';
import { ChequeComponent } from './cheque/cheque.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { AgmCoreModule } from '@agm/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';



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
    NgbModule,
    NgApexchartsModule,
    NgxSliderModule,
    PdfViewerModule,
    AgmCoreModule.forRoot(
      {
        apiKey: 'AIzaSyChd-Z-kjZi6rp7JOiBU-g7xqxJ1kfhSgw'
      }
    ),
    
  ]

})
export class ReceptionModule { }
