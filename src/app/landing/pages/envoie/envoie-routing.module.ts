import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnvoieComponent } from './envoie.component';

const routes: Routes = [{ path: '', component: EnvoieComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnvoieRoutingModule { }
