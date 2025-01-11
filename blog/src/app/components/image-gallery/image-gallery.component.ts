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

  constructor(private service: DataService) { }

  ngOnInit(): void {
    this.loadImageUrls();
    this.subscribeToPostUpdates();
  }

  ngOnDestroy(): void {
  }

  loadImageUrls(): void {
    this.service.getAll().subscribe(response => {
      const items = response;
      if (Array.isArray(items)) {
        this.imageUrls = items.map(item => item.image);
      }
    });
  }

  subscribeToPostUpdates(): void {
    this.loadImageUrls();
  }

  openFullscreen(imageUrl: string): void {
    this.selectedImageUrl = imageUrl;
  }

  closeFullscreen(): void {
    this.selectedImageUrl = null;
  }
}
