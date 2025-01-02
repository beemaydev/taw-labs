import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'image-gallery',
  imports: [CommonModule],
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.css']
})
export class ImageGalleryComponent implements OnInit, OnDestroy {
  imageUrls: string[] = [];
  selectedImageUrl: string | null = null;
  private postsSubscription: Subscription | undefined;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.loadImageUrls();
    this.subscribeToPostUpdates();
  }

  ngOnDestroy(): void {
    if (this.postsSubscription) {
      this.postsSubscription.unsubscribe();
    }
  }

  loadImageUrls(): void {
    const posts = this.dataService.getAll();
    this.imageUrls = posts
      .map(post => post.image)
      .filter(imageUrl => !!imageUrl);
  }

  subscribeToPostUpdates(): void {
    this.postsSubscription = this.dataService.postsUpdated$.subscribe(() => {
      this.loadImageUrls();
    });
  }

  openFullscreen(imageUrl: string): void {
    this.selectedImageUrl = imageUrl;
  }

  closeFullscreen(): void {
    this.selectedImageUrl = null;
  }
}
