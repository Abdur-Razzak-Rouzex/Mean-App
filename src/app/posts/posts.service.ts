import {PostModel} from './post.model';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';


/* instead of using Injectable here you also could have added this service to
 the providers array in the app.module.ts file */

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: PostModel[] = [];
  private postUpdatedSubject = new Subject<PostModel[]>();
  baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {
  }

  getPosts() {
    this.http.get<{ message: string, posts: PostModel[] }>(this.baseUrl + '/api/posts')
      .subscribe((postData) => {
        this.posts = postData.posts;
        this.postUpdatedSubject.next([...this.posts]);
      });
  }

  getPostUpdateListenerObservable() {
    return this.postUpdatedSubject.asObservable();
  }

  addPost(post: PostModel) {
    const addedPost: PostModel = {
      title: post.title,
      content: post.content,
    };

    this.http.post<{ message: string }>(this.baseUrl + '/api/posts', addedPost)
      .subscribe((response) => {
        console.log('the post response data: ', response);
        this.posts.push(addedPost);
        this.postUpdatedSubject.next([...this.posts]);
      });
  }
}
