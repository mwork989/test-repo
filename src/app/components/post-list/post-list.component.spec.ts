import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostListComponent } from './post-list.component';
import { PostsService } from '../../services/posts.service';
import { of } from 'rxjs';

describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;
  let mockPostService: jasmine.SpyObj<PostsService>

  beforeEach(async () => {
    const posts = [
      { userId: 1, id: 1, title: 'Post 1', body: 'Body of post 1' },
      { userId: 2, id: 2, title: 'Post 2', body: 'Body of post 2' },
    ];
    mockPostService = jasmine.createSpyObj('PostsService', ['getPosts']);
    mockPostService.getPosts.and.returnValue(of(posts));

    await TestBed.configureTestingModule({
      declarations: [PostListComponent],
      providers:[{provide:PostsService, useValue: mockPostService}]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display posts in the template',()=>{
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const listItems = compiled.querySelectorAll('li');

    expect(listItems.length).toBe(2);
    expect(listItems[0].textContent).toContain('Post 1');
    expect(listItems[1].textContent).toContain('Post 2');
  })
});
