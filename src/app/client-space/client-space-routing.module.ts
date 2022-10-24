import { AuthGuard } from './../helpers/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { DepotsComponent } from './depots/depots.component';
import { CreditsComponent } from './credits/credits.component';

const routes: Routes = [
  { path: '', redirectTo: 'mon-compte', pathMatch: 'full' },
  { path: 'mon-compte',canActivate: [AuthGuard], component: ProfileComponent, data: { title: 'Mon Compte' } },
  { path: 'depots',canActivate: [AuthGuard], component: DepotsComponent, data: { title: 'Dépots' } },
  { path: 'mes-credits',canActivate: [AuthGuard], component: CreditsComponent, data: { title: 'Mes Crédits' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientSpaceRoutingModule { }
