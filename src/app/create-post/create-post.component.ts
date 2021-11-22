import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  postContent: string = "empty post";
  newPostContent: string = "";
  constructor() { }

  ngOnInit(): void {
  }
  
  // onAddPost(postTextArea : HTMLTextAreaElement) {
  //   console.dir(postTextArea);
  //   this.postContent = postTextArea.value;
  // }

  onAddPost() {
    this.postContent = this.newPostContent;
  }
}
