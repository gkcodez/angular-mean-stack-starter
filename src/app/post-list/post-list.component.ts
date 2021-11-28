import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  public isLoading: boolean = false;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.postService.getPosts();
    this.postService.getPostsAsync().subscribe((x) => {
      this.posts = x;
      this.isLoading = false;
    });
  }

  onDelete(id: string){
    this.postService.deletePost(id);
  }
}
