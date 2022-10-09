import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { PageNotFoundComponent } from './helpers/error/page-not-found/page-not-found.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { LandingComponent } from './layouts/landing/landing.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { AuthGuard } from './helpers/auth.guard';
import { ServerErrorComponent } from './helpers/error/server-error/server-error.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch:'full'
  },
  {
    path: '',
    component: LandingComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/landing/landing.module').then(m => m.LandingModule)
      }
    ]
  },
  {
    path: '',
    component: AdminComponent,
    children: [ 
      {
        path: 'admin',
        loadChildren: () => import('./layouts/admin/admin.module').then(m => m.AdminModule),
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_GESTIONNAIRE_CLIENTELE', 'ROLE_CONSEILLER_CLIENTELE','ROLE_MEMBRE_DIRECTOIRE','ROLE_PERSONNEL_FINANCIER','ROLE_PERSONNEL_RH','ROLE_EMPLOYE_CAP'] }
      }
      
    ]
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./layouts/auth/auth.module').then(m => m.AuthModule)
      }
    ]
  },
  {
    path: 'internal-server-error',
    component:ServerErrorComponent
  },
  {
    path: '**',
    component:PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
