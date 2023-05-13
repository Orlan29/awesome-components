import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Comment } from "../../../core/models/comment.model";
import {FormBuilder, FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit{
  @Input() comments!: Comment[];
  commentCtrl!: FormControl;
  @Output() newComment = new EventEmitter<string>();

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.commentCtrl = this.fb.control('', [Validators.required, Validators.minLength(10)])
  }

  onLeaveComment() {
    if (this.commentCtrl.invalid) {
      return;
    }
    this.newComment.emit(this.commentCtrl.value);
    this.commentCtrl.reset();
  }
}
