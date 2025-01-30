import { Component, OnInit, Input } from '@angular/core';
import { CommentsService } from '../../services/comments.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'comments-section',
  imports: [CommonModule, FormsModule],
  templateUrl: './comments-section.component.html',
  styleUrls: ['./comments-section.component.css']
})

export class CommentsSectionComponent implements OnInit {
  @Input() postId: string | undefined;

  comments: string[] = [];
  newComment: string = '';

  constructor(private commentsService: CommentsService) {
  }

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments(): void {
    if (this.postId !== undefined) {
      this.comments = this.commentsService.getCommentsByPostId(this.postId);
    }
  }

  addComment(): void {
    if (this.postId !== undefined) {
      if (this.newComment.trim() !== '') {
        this.commentsService.addComment(this.postId, this.newComment);
        this.newComment = '';
        this.loadComments();
      }
    }
  }

}
