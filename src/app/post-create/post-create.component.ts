import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
})
export class PostCreateComponent implements OnInit {
  // postContent: string = "";

  // @Output() postCreated = new EventEmitter<Post>();
  // newPostTitle: string = '';
  // newPostContent: string = '';

  private isEdit: boolean = false;
  public post: any = {};
  public isLoading: boolean = true;

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = false;
    this.activatedRoute.paramMap.subscribe((x) => {
      let id = x.get('id');
      if (id) {
        this.isEdit = true;
        this.postService.getPost(id).subscribe(x => {
          this.post = x.post[0];
        });        
      } else {
        this.isEdit = false;
        this.post.id = null;
      }
      console.log(this.isLoading);
    });
  }

  // onAddPost(postTextArea : HTMLTextAreaElement) {
  //   console.dir(postTextArea);
  //   this.postContent = postTextArea.value;
  // }

  onSavePost(postForm: NgForm) {
    // this.postContent = this.newPostContent;
    this.isLoading = true;
    if (postForm.invalid) {
      return;
    }
    const post: Post = {
      id: '',
      title: postForm.value.postTitle,
      content: postForm.value.postContent,
    };
    if(this.isEdit) {
      post.id = this.post._id;
      console.log(post);
      this.postService.modifyPost(post);
    } else {
      this.postService.addPost(post);
    }
    postForm.resetForm();
    this.isLoading = false;
    this.router.navigate(["/"]);
  }
}
