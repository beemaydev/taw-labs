import { Component, OnInit, Input } from '@angular/core';
import { DataService } from "../../services/data.service";
import { BlogItemComponent } from "../blog-item/blog-item.component";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

import { FilterTextPipe } from "../../pipes/filter-text.pipe";
import { ImageGalleryComponent } from '../image-gallery/image-gallery.component';
import { AddPostComponent } from '../add-post/add-post.component';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [HttpClientModule, BlogItemComponent, CommonModule, FilterTextPipe],
  providers: [DataService],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})

export class BlogComponent implements OnInit {

  @Input() filter: string = '';

  public items$: any;

  constructor(private service: DataService) {
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
}

  ngOnInit() {
    this.getAll();
  }

  onPostDeleted() {
    this.refreshPosts();
    console.log("Refresh after delete");
  }

  getAll() {
    this.service.getAll().subscribe(response => {
      this.items$ = response;
    });
  }

  refreshPosts() {
    this.getAll();
  }

}
