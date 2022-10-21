import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalaireComponent } from './salaire.component';

const routes: Routes = [{ path: '', component: SalaireComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalaireRoutingModule { }
