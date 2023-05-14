import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "./material.module";
import {CommentComponent} from "./components/comment/comment.component";
import {ReactiveFormsModule} from "@angular/forms";
import {ShortenPipe} from "./pipes/shorten.pipe";
import {UsernamePipe} from "./pipes/username.pipe";
import {TimeAgoPipe} from "./pipes/time-ago.pipe";



@NgModule({
  declarations: [
    CommentComponent,
    ShortenPipe,
    UsernamePipe,
    TimeAgoPipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    MaterialModule,
    CommentComponent,
    ReactiveFormsModule,
    ShortenPipe,
    UsernamePipe,
    TimeAgoPipe
  ]
})
export class SharedModule { }
