import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  public imagePreview: any;
  form: FormGroup = new FormGroup({
    'title': new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
    'content': new FormControl(null, {validators: [Validators.required]}),
    'image': new FormControl(null, {validators: [Validators.required]}),
  });

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
          this.form.setValue({
            'title': this.post.title,
            'content': this.post.content,
            'image': null,
          })
        });
      } else {
        this.isEdit = false;
        this.post.id = null;
      }
      // console.log(this.isLoading);
    });
  }

  // onAddPost(postTextArea : HTMLTextAreaElement) {
  //   console.dir(postTextArea);
  //   this.postContent = postTextArea.value;
  // }
  onImagePicked(event: Event){
    const file = (event?.target as HTMLInputElement)?.files![0];
    this.form.patchValue({image: file});
    this.form.get('image')?.updateValueAndValidity();
    console.log(file);
    console.log(this.form);
    let reader = new FileReader();
    console.log(this.imagePreview);
    reader.onload = () => {
      this.imagePreview = reader.result;
      console.log(this.imagePreview);
    };
    reader.readAsDataURL(file);
  }
  onSavePost() {
    // this.postContent = this.newPostContent;
    this.isLoading = true;
    if (this.form.invalid) {
      return;
    }
    const post: Post = {
      id: '',
      title: this.form.get('title')?.value,
      content: this.form.get('content')?.value,
    };
    if(this.isEdit) {
      post.id = this.post._id;
      // console.log(post);
      this.postService.modifyPost(post);
    } else {
      this.postService.addPost(post);
    }
    this.form.reset();
    this.isLoading = false;
    this.router.navigate(["/"]);
  }
}
