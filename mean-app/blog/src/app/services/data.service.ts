import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { json } from 'stream/consumers';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  
  private url = 'http://localhost:3100';
  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get(this.url + '/api/posts');
  }

  getById(id: string) {
    return this.http.get(this.url + '/api/post/' + id);
  }

  addPost(title: string, text: string, image: string) {
    return this.http.post<void>(this.url + '/api/post', {
      title,
      text,
      image,
    });
  }

  deletePost(id: string) {
    return this.http.delete<void>(this.url + '/api/post/' + id);
  }
}
