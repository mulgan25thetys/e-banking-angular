import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepotsRoutingModule } from './depots-routing.module';
import { DepotsComponent } from './depots.component';
import { ListeComponent } from './liste/liste.component';
import { AddComponent } from './add/add.component';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [
    DepotsComponent,
    ListeComponent,
    AddComponent
  ],
  imports: [
    CommonModule,
    DepotsRoutingModule,
    FormsModule,
    Ng2SearchPipeModule
  ]
})
export class DepotsModule { }
