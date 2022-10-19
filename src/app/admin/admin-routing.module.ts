import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',redirectTo:'tableau-de-bords',pathMatch:'full'
  },
  {
    path: 'tableau-de-bords',
    component:DashboardComponent
  },
  {
    path: '',
    component: UserComponent,
    children: [
      { path: 'utilisateurs', loadChildren: () => import('./user/user.module').then(m => m.UserModule) }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
