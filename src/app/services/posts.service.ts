import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPostsModel } from '../models/posts.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<IPostsModel[]> {
    return this.http.get<IPostsModel[]>(
      'https://jsonplaceholder.typicode.com/posts'
    );
  }
}
