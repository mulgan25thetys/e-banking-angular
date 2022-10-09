import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { PageActionComponent } from './components/page-action/page-action.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { UsersModule } from './modules/users/users.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerInterceptorService } from 'src/app/helpers/spinner-interceptor.service';
import { DataService } from 'src/app/services/data.service';
import { FormsModule } from '@angular/forms';
import { TableComponent } from './components/table/table.component';


@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    PageTitleComponent,
    PageActionComponent,
    TableComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    NgxPaginationModule,
    UsersModule,
    Ng2SearchPipeModule
  ],
  providers: [
    DataService,
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptorService, multi: true,},
  ],
  exports: [HeaderComponent, NavbarComponent,
    FooterComponent, SidebarComponent, PageTitleComponent,
    PageActionComponent, TableComponent]
})
export class AdminModule { }
