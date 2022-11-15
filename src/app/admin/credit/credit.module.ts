import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditRoutingModule } from './credit-routing.module';
import { CreditComponent } from './credit.component';
import { ListComponent } from './list/list.component';
import { PaiementsComponent } from './paiements/paiements.component';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    CreditComponent,
    ListComponent,
    PaiementsComponent
  ],
  imports: [
    CommonModule,
    CreditRoutingModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    NgApexchartsModule,
    NgbModule
  ]
})
export class CreditModule { }
