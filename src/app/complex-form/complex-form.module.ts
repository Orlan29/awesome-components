import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";
import { ComplexFormComponent } from './components/complex-form/complex-form.component';
import {ComplexFormRoutingModule} from "./complex-form-routing.module";
import {ComplexFormService} from "./services/complex-form.service";

@NgModule({
  declarations: [
    ComplexFormComponent
  ],
  imports: [
    SharedModule,
    ComplexFormRoutingModule,
    RouterModule
  ],
  exports: [],
  providers: [
    ComplexFormService
  ]
})
export class ComplexFormModule {}
