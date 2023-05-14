import {Component, OnInit} from '@angular/core';
import {map, Observable, tap} from "rxjs";
import {Post} from "../../models/post.model";
import {ActivatedRoute} from "@angular/router";
import {PostService} from "../../services/post.service";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit{
  posts$!: Observable<Post[]>;

  constructor(private route: ActivatedRoute,
              private postService: PostService) {
  }
  ngOnInit(): void {
    this.posts$ = this.route.data.pipe(
      map(data => data['posts'])
    )
  }

  onPostCommented(comment: {comment: string, postId: number}): void {
    this.postService.addNewComment(comment);
  }
}