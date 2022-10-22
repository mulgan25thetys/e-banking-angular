import { DepotComponent } from './depot/depot.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarteBancaireComponent } from './carte-bancaire/carte-bancaire.component';
import { PrelevementComponent } from './prelevement/prelevement.component';
import { CompteBancaireComponent } from './compte-bancaire/compte-bancaire.component';

const routes: Routes = [
  { path: '', redirectTo: 'depots', pathMatch: 'full' },
  { path: 'depots', component: DepotComponent },
  { path: 'carte-bancaires', component: CarteBancaireComponent },
  { path: 'prelevements',component:PrelevementComponent},
  { path: 'compte-bancaire',component:CompteBancaireComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepotsRoutingModule { }
