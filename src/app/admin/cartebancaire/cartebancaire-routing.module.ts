import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartebancaireComponent } from './cartebancaire.component';
import { ListeComponent } from './liste/liste.component';

const routes: Routes = [
  { path: '', redirectTo: 'liste', pathMatch: 'full' },
  { path: 'liste',component:ListeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartebancaireRoutingModule { }
