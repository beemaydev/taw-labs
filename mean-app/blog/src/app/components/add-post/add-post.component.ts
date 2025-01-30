import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'add-post',
  imports: [FormsModule],
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})

export class AddPostComponent {
  newPostTitle: string = '';
  newPostText: string = '';
  newPostImage: string = '';
  postAdded: boolean = false;

  constructor(private dataService: DataService) { }

  addPostF(): void {
    this.dataService.addPost(this.newPostTitle, this.newPostText, this.newPostImage).subscribe({
      next: () => {
        this.newPostTitle = '';
        this.newPostText = '';
        this.newPostImage = '';

        this.postAdded = true;

        setTimeout(() => {
          this.postAdded = false;
        }, 3000);
      }
    });

  }
}
