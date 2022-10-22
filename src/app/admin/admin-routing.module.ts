import { CongeComponent } from './conge/conge.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepotsComponent } from './depots/depots.component';
import { CreditComponent } from './credit/credit.component';
import { AuthGuard } from '../helpers/auth.guard';
import { SalaireComponent } from './salaire/salaire.component';
import { FormationComponent } from './formation/formation.component';

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
  {
    path: '',
    component: DepotsComponent,
    children: [
      {
        path: 'depots', canActivate: [AuthGuard], data: {
          roles: ['ROLE_GESTIONNAIRE_CLIENTELE']
        }, loadChildren: () => import('./depots/depots.module').then(m => m.DepotsModule) },
    ]
  },
  {
    path: '',
    component: CreditComponent,
    children: [
      { path: 'credits', loadChildren: () => import('./credit/credit.module').then(m => m.CreditModule) },
    ]
  },
  {
    path: '',
    component: CongeComponent,
    children: [
      { path: 'conges', canActivate: [AuthGuard], data: {
          roles: ['ROLE_PERSONNEL_RH']
        }, loadChildren: () => import('./conge/conge.module').then(m => m.CongeModule) }
    ]
  },
  {
    path: '',
    component: SalaireComponent,
    children: [
      { path: 'salaires',canActivate: [AuthGuard], data: {
          roles: ['ROLE_PERSONNEL_RH']
        }, loadChildren: () => import('./salaire/salaire.module').then(m => m.SalaireModule) }
    ]
  },
  {
    path: '',
    component: FormationComponent,
    children: [
      { path: 'formations',canActivate: [AuthGuard], data: {
          roles: ['ROLE_PERSONNEL_RH']
        }, loadChildren: () => import('./formation/formation.module').then(m => m.FormationModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
