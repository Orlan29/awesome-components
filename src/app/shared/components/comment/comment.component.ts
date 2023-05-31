import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Comment } from "../../../core/models/comment.model";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {
  animate,
  animateChild,
  animation,
  group,
  query, sequence,
  stagger,
  state,
  style,
  transition,
  trigger, useAnimation
} from "@angular/animations";
import {flashAnimation} from "../../animations/flash.animation";
import {slideAndFadeAnimation} from "../../animations/slide-and-fade.animation";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  animations: [
    trigger('list', [
      transition(':enter', [
        query('@listItem', [
          stagger(50, [ // Permet de décaler le démarrage de chauque annimation
            animateChild()
          ])
        ])
      ])
    ]),
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
      ]),
      transition(':enter', [
        query('.comment-text, .comment-date', [
          style({
            opacity: 0
          })
        ]),
        useAnimation(slideAndFadeAnimation, {
          params: {
            time: '250ms',
            startColor: 'rgb(201, 157, 242)'
          }
        }),
        group([ // Permet d'annimer en parallèle
          useAnimation(flashAnimation, {
            params: {
              time: '250ms',
              flashColor: 'rgb(201, 157, 242)'
            }
          }),
          query('.comment-text', [ // Permet d'animer un élément à la fois
            animate('250ms ease-in-out', style({
              opacity: 1
            }))
          ]),
          query('.comment-date', [ // Permet d'animer un élément à la fois
            animate('500ms ease-in-out', style({
              opacity: 1
            }))
          ])
        ])
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
    const maxId = Math.max(...this.comments.map(comment => comment.id));
    this.comments.unshift({
      id: maxId,
      comment: this.commentCtrl.value,
      createdDate: new Date().toISOString(),
      userId: 1
    });
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
