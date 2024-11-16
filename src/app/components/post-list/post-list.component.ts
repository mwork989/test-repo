import { Component } from '@angular/core';
import { IPostsModel } from '../../models/posts.model';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent {
  public posts: IPostsModel[] = [];

  constructor(private postService: PostsService) {}

  ngOnInit(): void {
    this.postService.getPosts().subscribe((data) => (this.posts = data));
  }

  getPostValue(){
    return []
  }
}
