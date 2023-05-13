import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "./material.module";
import {CommentComponent} from "./components/comment/comment.component";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    CommentComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    MaterialModule,
    CommentComponent,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
