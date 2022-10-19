import { AuthGuard } from './../helpers/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'mon-compte', pathMatch: 'full' },
  { path: 'mon-compte',canActivate: [AuthGuard], component: ProfileComponent, data: { title: 'Mon Compte' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientSpaceRoutingModule { }
