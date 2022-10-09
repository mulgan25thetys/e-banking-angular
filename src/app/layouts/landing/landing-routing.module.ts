import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/helpers/auth.guard';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path:'',redirectTo:'home',pathMatch:'full'},
  { path: 'home', component: HomeComponent, data: { title: 'JMLessous' } },
  { path: 'profile', canActivate: [AuthGuard], component: ProfileComponent, data: { title: 'Mon profile' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
