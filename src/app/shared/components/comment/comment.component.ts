import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Comment } from "../../../core/models/comment.model";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  animations: [
    trigger('listItem', [
      state('default', style({
        transform: 'scale(1)',
        'background-color': 'white',
        'z-index': 1
      })),
      state('active', style({
        transform: 'scale(1.05)',
        'background-color': 'rgb(201, 157, 242)',
        'z-index': 2
      })),
      transition('default => active', [
        animate('100ms ease-in-out')
      ]),
      transition('active => default', [
        animate('500ms ease-in-out')
      ])
    ])
  ]
})
export class CommentComponent implements OnInit{
  @Input() comments!: Comment[];
  commentCtrl!: FormControl;
  @Output() newComment = new EventEmitter<string>();
  animationState: {[key: number]: 'default' | 'active'} = {};

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.commentCtrl = this.fb.control('', [Validators.required, Validators.minLength(10)]);
    for(let index in this.comments) {
      this.animationState[index] = 'default';
    }
  }

  onLeaveComment() {
    if (this.commentCtrl.invalid) {
      return;
    }
    this.newComment.emit(this.commentCtrl.value);
    this.commentCtrl.reset();
  }

  onMouseEnter(index: number): void {
    this.animationState[index] = 'active';
  }

  onMouseLeave(index: number): void {
    this.animationState[index] = 'default';
  }
}
