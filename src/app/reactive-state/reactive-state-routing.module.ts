import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CanditatesListComponent} from "./components/canditates-list/canditates-list.component";
import {SingleCandidateComponent} from "./components/single-candidate/single-candidate.component";

const routes: Routes = [
  {path: 'candidates', component: CanditatesListComponent},
  {path: 'candidates/:id', component: SingleCandidateComponent},
  {path: '', pathMatch: 'full', redirectTo: 'candidates'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReactiveStateRoutingModule { }
