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

  constructor(private dataService: DataService) { }

  addPost(): void {
    this.dataService.addPost(this.newPostTitle, this.newPostText, this.newPostImage);
    this.newPostTitle = '';
    this.newPostText = '';
    this.newPostImage = '';
  }
}
