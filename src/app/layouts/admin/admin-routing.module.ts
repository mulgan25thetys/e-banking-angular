import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './modules/users/users.component';

const routes: Routes = [
  { path : '',redirectTo:'dashboard',pathMatch:'full'},
  { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' } },
  {
    path: '',
    component: UsersComponent,
    children: [
      { path: 'interfaces/users', loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule) }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
