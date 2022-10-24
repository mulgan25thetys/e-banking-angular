import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChequeComponent } from './cheque/cheque.component';
import { CreditComponent } from './credit/credit.component';

const routes: Routes = [
  { path: '', redirectTo: 'credits', pathMatch: 'full' },
  { path: 'credits',component:CreditComponent},
  { path: 'cheques',component:ChequeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceptionRoutingModule { }
