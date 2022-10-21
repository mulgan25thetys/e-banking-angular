import { DeviseComponent } from './pages/devise/devise.component';
import { DepotsComponent } from './pages/depots/depots.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReceptionComponent } from './pages/reception/reception.component';
import { EnvoieComponent } from './pages/envoie/envoie.component';
import { AssuranceComponent } from './pages/assurance/assurance.component';

const routes: Routes = [
  { path: '',redirectTo:'accueil',pathMatch:'full'},
  { path: 'accueil', component: HomeComponent },
  { 
    path: '',
    component: ReceptionComponent,
    children: [
      { path: 'reception', loadChildren: () => import('./pages/reception/reception.module').then(m => m.ReceptionModule) }
    ]
  },
  {
    path: '',
    component: DepotsComponent,
    children: [
      { path: 'collecte-depots', loadChildren: () => import('./pages/depots/depots.module').then(m => m.DepotsModule) },
    ]
  },
  {
    path: '',
    component: EnvoieComponent,
    children: [
      { path: 'envoie', loadChildren: () => import('./pages/envoie/envoie.module').then(m => m.EnvoieModule) }
    ]
  },
  {
    path: '',
    component: AssuranceComponent,
    children: [
      { path: 'assurance', loadChildren: () => import('./pages/assurance/assurance.module').then(m => m.AssuranceModule) }
    ]
  },
  {
    path: '',
    component: DeviseComponent,
    children: [
      { path: 'devises', loadChildren: () => import('./pages/devise/devise.module').then(m => m.DeviseModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
