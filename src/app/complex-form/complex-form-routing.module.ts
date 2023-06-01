import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ComplexFormComponent} from "./components/complex-form/complex-form.component";

const route: Routes = [
  {path: '', component: ComplexFormComponent}
]
@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})
export class ComplexFormRoutingModule {}
