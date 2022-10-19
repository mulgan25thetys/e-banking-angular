import { ClientSpaceComponent } from './client-space/client-space.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthentificationComponent } from './authentification/authentification.component';
import { Error404Component } from './error404/error404.component';
import { LandingComponent } from './landing/landing.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './helpers/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'accueil',
    pathMatch:'full'
  },
  {
    path: '',
    component: AuthentificationComponent,
    children: [
      { path: 'auth', loadChildren: () => import('./authentification/authentification.module').then(m => m.AuthentificationModule) }
    ]
  },
  {
    path: '',
    component: LandingComponent,
    children: [
      { path: '', loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule) },
    ]
  },
  {
    path: '',
    component: ClientSpaceComponent,
    children: [
      { path: 'espace-client', canActivate: [AuthGuard], data: { roles: ['ROLE_CLIENT'] }, loadChildren: () => import('./client-space/client-space.module').then(m => m.ClientSpaceModule) },
    ]
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'admin', canActivate: [AuthGuard], data: {
          roles: ['ROLE_MEMBRE_DIRECTOIRE',
            'ROLE_GESTIONNAIRE_CLIENTELE', 'ROLE_DECIDEUR', 'ROLE_CONSEILLER_CLIENTELE',
            'ROLE_DIRECTEUR_FINANCIER', 'ROLE_GESTIONNAIRE_PATRIMOINE', 'ROLE_CONTROLEUR_GESTION',
            'ROLE_CHARGE_ETUDE','ROLE_PERSONNEL_RH','ROLE_EMPLOYE_CAP']
        }, loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
      },
    ]
  },
  { 
    path: '**',
    component: Error404Component,
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
