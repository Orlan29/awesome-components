import {ResolveFn} from "@angular/router";
import {Observable} from "rxjs";
import {Post} from "../../social-media/models/post.model";
import {inject} from "@angular/core";
import {PostService} from "../../social-media/services/post.service";

export const postResolver: ResolveFn<Post[]> = (route, state): Observable<Post[]> => {
  return inject(PostService).getPosts();
}
