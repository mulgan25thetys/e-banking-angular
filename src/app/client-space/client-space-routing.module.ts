import { AuthGuard } from './../helpers/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { DepotsComponent } from './depots/depots.component';
import { CreditsComponent } from './credits/credits.component';
import { NotificationComponent } from './notification/notification.component';

const routes: Routes = [
  { path: '', redirectTo: 'mon-compte', pathMatch: 'full' },
  { path: 'mon-compte',canActivate: [AuthGuard], component: ProfileComponent, data: { title: 'Mon Compte' } },
  { path: 'depots',canActivate: [AuthGuard], component: DepotsComponent, data: { title: 'Dépots' } },
  { path: 'mes-credits',canActivate: [AuthGuard], component: CreditsComponent, data: { title: 'Mes Crédits' } },
  { path: 'mes-notifications',canActivate: [AuthGuard], component: NotificationComponent, data: { title: 'Mes Notifications' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientSpaceRoutingModule { }
