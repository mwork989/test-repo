import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PostsService } from './posts.service';
import { IPostsModel } from '../models/posts.model';

describe('PostsService', () => {
  let service: PostsService;
  let httpMock : HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[PostsService]
    });
    service = TestBed.inject(PostsService);
    httpMock = TestBed.inject(HttpTestingController)
  });

  afterEach(()=>{
    httpMock.verify()
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve posts from the API',()=>{
    const dummyPosts:any[]=[
      { userId: 1, id: 1, title: 'Post 1', body: 'Body of post 1' },
      { userId: 2, id: 2, title: 'Post 2', body: 'Body of post 2', test:12 },
    ];

    service.getPosts().subscribe((posts:IPostsModel[])=>{
      expect(posts.length).toBe(2);
      console.log(posts)
      expect(posts).toEqual(dummyPosts);
    })

    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/posts');
    expect(req.request.method).toBe('GET');
    req.flush(dummyPosts)
  })
});
