import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  posts: Post[] = [];
  postSubject = new Subject<Post[]>();

  getPosts() {
    this.http
      .get<{ message: string; posts: any }>('http://localhost:3000/api/posts')
      .pipe(
        map((x) => {
          return x.posts.map((x: { _id: string; title: string; content: string }) => {
            return {
              id: x._id,
              title: x.title,
              content: x.content,
            };
          });
        })
      )
      .subscribe(x => {
        this.posts = x;
        this.postSubject.next(this.posts);
      });
  }

  getPost(id: string) {
    return this.http.get<{ message: string; post: any}>("http://localhost:3000/api/posts/" + id);
  }

  getPostsAsync(): Observable<Post[]> {
    return this.postSubject.asObservable();
  }

  addPost(post: Post) {
    this.http
      .post<{ message: string; _id: string }>(
        'http://localhost:3000/api/posts',
        post
      )
      .subscribe((x) => {
        post.id = x._id;
        console.log(x);
        this.posts.push(post);
        this.postSubject.next(this.posts);
      });
  }

  modifyPost(post: Post) {
    this.http
      .put<any>('http://localhost:3000/api/posts/' + post.id, post)
      .subscribe((x) => {
        const updatedPosts = [...this.posts];
        const oldPostsIndex = updatedPosts.findIndex((p) => p.id === post.id);
        updatedPosts[oldPostsIndex] = post;
        this.posts = updatedPosts;
        this.postSubject.next([...this.posts]);
      });
  }

  deletePost(id: string) {
    this.http
      .delete<{ message: string }>('http://localhost:3000/api/posts/' + id)
      .subscribe((x) => {
        console.log(x);
        this.posts = this.posts.filter((x) => x.id !== id);
        this.postSubject.next([...this.posts]);
      });
  }
}
