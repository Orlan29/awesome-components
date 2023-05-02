import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocialMediaRoutingModule } from './social-media-routing.module';
import { PostComponent } from './components/post/post.component';
import {PostService} from "./services/post.service";


@NgModule({
  declarations: [
    PostComponent
  ],
  imports: [
    CommonModule,
    SocialMediaRoutingModule
  ],
  providers: [
    PostService
  ]
})
export class SocialMediaModule { }
