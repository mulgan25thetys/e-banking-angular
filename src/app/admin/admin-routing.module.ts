import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartebancaireComponent } from './cartebancaire/cartebancaire.component';
import { CreditComponent } from './credit/credit.component';
import { AuthGuard } from '../helpers/auth.guard';

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
    component: CartebancaireComponent,
    children: [
      {
        path: 'cartes-bancaires', canActivate: [AuthGuard], data: {
          roles: ['ROLE_GESTIONNAIRE_CLIENTELE']
        }, loadChildren: () => import('./cartebancaire/cartebancaire.module').then(m => m.CartebancaireModule) },
    ]
  },
  {
    path: '',
    component: CreditComponent,
    children: [
      { path: 'credits', loadChildren: () => import('./credit/credit.module').then(m => m.CreditModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
