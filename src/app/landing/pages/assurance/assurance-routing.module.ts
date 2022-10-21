import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssuranceComponent } from './assurance.component';

const routes: Routes = [{ path: '', component: AssuranceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssuranceRoutingModule { }
