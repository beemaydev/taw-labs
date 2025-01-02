import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CommentsService {
  private commentsByPostId: Map<string, string[]> = new Map();

  constructor() { }

  addComment(postId: string, comment: string): void {
    if (!this.commentsByPostId.has(postId)) {
      this.commentsByPostId.set(postId, []);
    }
    this.commentsByPostId.get(postId)?.push(comment);
  }

  getCommentsByPostId(postId: string): string[] {
    return this.commentsByPostId.get(postId) || [];
  }
}
