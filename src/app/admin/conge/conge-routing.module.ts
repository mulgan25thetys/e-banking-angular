import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CongeComponent } from './conge.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  { path: '', redirectTo: 'listes', pathMatch: 'full' },
  { path: 'listes',component:ListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CongeRoutingModule { }
