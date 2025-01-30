import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BlogItemImageComponent } from "../blog-item-image/blog-item-image.component";
import { BlogItemTextComponent } from "../blog-item-text/blog-item-text.component";
import { CommentsSectionComponent } from '../comments-section/comments-section.component';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-blog-item',
  standalone: true,
  imports: [BlogItemImageComponent, BlogItemTextComponent, CommentsSectionComponent],
  templateUrl: './blog-item.component.html',
  styleUrl: './blog-item.component.css'
})

export class BlogItemComponent {
  @Input() image?: string;
  @Input() text?: string;
  @Input() id!: string;
  @Input() title?: string;

  @Output() postDeleted = new EventEmitter();

  constructor(private dataService: DataService) { }

  deletePostF():void {
    this.dataService.deletePost(this.id).subscribe({
      next: () => {
        this.postDeleted.emit();
      }
    });
  }
}
