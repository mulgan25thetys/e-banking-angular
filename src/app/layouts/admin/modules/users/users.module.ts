import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { ListComponent } from './list/list.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { AddUserComponent } from './add-user/add-user.component';
import { DataService } from 'src/app/services/data.service';
import { DetailUserComponent } from './detail-user/detail-user.component';


@NgModule({
  declarations: [
    UsersComponent,
    ListComponent,
    AddUserComponent,
    DetailUserComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    UsersRoutingModule,
    Ng2SearchPipeModule,
    NgxPaginationModule
  ],
  providers: [
    DataService
  ],
  exports: [
    AddUserComponent
  ]
})
export class UsersModule { }
